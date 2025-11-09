import { useState, useRef } from 'react';

export const useMediaRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [lastRecordingUrl, setLastRecordingUrl] = useState(null);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    const startCamera = async () => {
        setError(null);
        setLastRecordingUrl(null);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current) {
                        videoRef.current.play();
                    }
                };
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
                recordedChunksRef.current = [];
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
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
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
            if (videoRef.current) videoRef.current.play();
        } else {
            mediaRecorderRef.current.pause();
            if (videoRef.current) videoRef.current.pause();
        }
        setIsPaused(!isPaused);
    };

    return {
        videoRef,
        isRecording,
        isPaused,
        lastRecordingUrl,
        error,
        videoStatusText: isPaused ? 'Paused' : '● Recording...',
        handleStartRecording,
        handleEndRecording,
        handlePauseRecording,
    };
};