import { useState, useRef, useEffect } from 'react';

export const useMediaRecorder = (onRecordingComplete) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [lastRecordingUrl, setLastRecordingUrl] = useState(null);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    
    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const startCamera = async () => {
    setError(null);
    setLastRecordingUrl(null);
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 1280, height: 720 },
            audio: true 
        });
        setStream(mediaStream);
        
        if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play().catch(e => {
                    console.error("Video play failed:", e);
                    setError("Could not start video preview");
                });
            });
        }
        
        recordedChunksRef.current = [];
        const recorder = new MediaRecorder(mediaStream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
            }
        };

        recorder.onstop = () => {
            const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setLastRecordingUrl(url);
            
            if (onRecordingComplete) {
                onRecordingComplete(blob);
            }
        };

        recorder.start();
        setIsRecording(true);
        setIsPaused(false);

    } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access camera. Please check permissions.");
    }
};

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const handleStartRecording = () => {
        startCamera();
    };

    const handleEndRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }
        stopCamera();
        setIsRecording(false);
        setIsPaused(false);
    };

    const handlePauseRecording = () => {
        if (!mediaRecorderRef.current) return;
        
        if (isPaused) {
            mediaRecorderRef.current.resume();
            if (videoRef.current) videoRef.current.play().catch(e => console.error("Video play failed:", e));
        } else {
            mediaRecorderRef.current.pause();
            if (videoRef.current) videoRef.current.pause();
        }
        setIsPaused(!isPaused);
    };

    const videoStatusText = isPaused ? 'Paused' : '● Recording...';

    return {
        videoRef,
        isRecording,
        isPaused,
        lastRecordingUrl,
        error,
        videoStatusText,
        handleStartRecording,
        handleEndRecording,
        handlePauseRecording,
    };
};