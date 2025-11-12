import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext.jsx';
import { useMediaRecorder } from '../hooks/useMediaRecorder.js';
import { VideoCameraIcon, StopIcon, PauseIcon } from '../components/common/Icons.jsx';
import { submitPersonData } from '../services/api.js'; 

const VideoWillPage = ({ onSetPage }) => {
    const { formData, updateVideoDescription } = useContext(FormContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const {
        videoRef,
        isRecording,
        isPaused,
        lastRecordingUrl,
        error: mediaError,
        videoStatusText,
        handleStartRecording,
        handleEndRecording,
        handlePauseRecording,
    } = useMediaRecorder(updateVideoDescription);

    const handleSaveAndSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);
        
        if (!formData.video_description && lastRecordingUrl) {
            console.warn("VideoWillPage: Video file not in context, fetching from last URL.");
            const blob = await fetch(lastRecordingUrl).then(r => r.blob());
            const videoFile = new File([blob], "legacy-video.webm", { type: "video/webm" });
            updateVideoDescription(videoFile);
            formData.video_description = videoFile;
        }

        if (!formData.video_description) {
            setSubmitError("Video not recorded. Please record a video before submitting.");
            setIsSubmitting(false);
            return;
        }
        
        try {
            await submitPersonData(formData);
            
            alert("Your legacy profile has been successfully submitted!");
            onSetPage('home');

        } catch (error) {
            console.error("Submission failed:", error);
            setSubmitError(error.message || "An unknown error occurred during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const error = mediaError || submitError;

    return (
        <div className="page container mx-auto max-w-4xl px-6 py-16 bg-gray-200 flex-grow">
            <div className="text-center mb-12">
                <h1 className="font-playfair text-4xl md:text-6xl font-bold text-indigo-900">Legacy Video Will</h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
                    Leave more than words behind. Record a personal video message to share love, guidance, and final wishes, allowing your family to see and hear you for generations to come.
                </p>
            </div>
            
            <div className="bg-transparent p-6 rounded-lg">
                
                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {/* Download/Save Link */}
                {lastRecordingUrl && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center" role="alert">
                        <span className="block sm:inline">Recording complete! </span>
                        <a href={lastRecordingUrl} download="legacy-video.webm" className="font-bold underline">Download Your Last Recording</a>
                    </div>
                )}
                
                <div 
                    className="border-4 border-dashed border-indigo-300 rounded-lg h-96 md:h-[450px] flex flex-col items-center justify-center text-center transition bg-indigo-50 overflow-hidden" 
                    style={{ backgroundColor: '#E6E6FA' }}
                >
                    {!isRecording ? (
                        <div onClick={handleStartRecording} className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-100 transition p-6">
                            <VideoCameraIcon />
                            <p className="text-2xl font-semibold text-gray-600 mt-4">Click the camera to start recording</p>
                        </div>
                    ) : (
                        <div className="w-full h-full relative bg-black">
                            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline autoPlay muted></video> 
                            <span className="absolute top-4 left-4 text-xl font-semibold text-red-500 z-10 bg-black/50 px-3 py-1 rounded">
                                {videoStatusText}
                            </span>
                        </div>
                    )}
                </div>

                {/* Controls shown before recording */}
                <div className={`mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 ${!isRecording ? '' : 'hidden'}`}>
                   <button onClick={handleEndRecording} className="flex items-center space-x-2 bg-gray-400 text-gray-800 px-8 py-3 rounded-lg font-semibold text-lg transition cursor-not-allowed">
                        <StopIcon />
                        <span>End Recording</span>
                    </button>
                    <button onClick={handlePauseRecording} className="flex items-center space-x-2 bg-gray-400 text-gray-800 px-8 py-3 rounded-lg font-semibold text-lg transition cursor-not-allowed">
                        <PauseIcon />
                        <span id="pause-text">Pause</span>
                    </button>
                </div>

                {/* Controls for when actively recording */}
                 <div className={`mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 ${isRecording ? '' : 'hidden'}`}>
                    <button onClick={handleEndRecording} className="flex items-center space-x-2 bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition">
                        <StopIcon />
                        <span>End Recording</span>
                    </button>
                    <button 
                        onClick={handlePauseRecording} 
                        className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold text-lg transition ${
                            isPaused 
                            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        <PauseIcon />
                        <span id="pause-text">{isPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                </div>

                {/* New button to save and return */}
                {lastRecordingUrl && !isRecording && (
                     <div className="mt-6 text-center">
                        <button 
                            onClick={handleSaveAndSubmit} 
                            disabled={isSubmitting}
                            className="w-full max-w-md bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-800 transition duration-300 text-lg disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Save & Submit Legacy'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoWillPage;