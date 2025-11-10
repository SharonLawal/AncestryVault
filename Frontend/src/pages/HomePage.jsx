import React, { useState } from 'react';
import ProgressBar from '../components/common/ProgressBar';
import FormStep1 from '../components/forms/FormStep1';
import FormStep2 from '../components/forms/FormStep2';
import FormStep3 from '../components/forms/FormStep3';
import image from '../assets/image.jpg';

const HomePage = ({ onSetPage }) => {
    
    const [formStep, setFormStep] = useState(1);
    
    const handleSubmit = () => {
        console.log('All steps complete, proceeding to video.');
        onSetPage('video-will');
    };
    
    return (
            <div className="page bg-gray-200">
                {/* Hero Section */}
                <div className="relative bg-gray-900 text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={image} alt="Family silhouette against a sunset" className="w-full h-full object-cover opacity-30" />
                    </div>
                    <div className="relative container mx-auto px-6 py-32 md:py-48 text-center">
                        <span className="text-sm font-semibold uppercase tracking-widest text-indigo-300">THE SMITHS</span>
                        <h1 className="font-playfair text-4xl md:text-6xl font-bold mt-4 mb-6">Preserving the family heritage for generations</h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                            Join our family archive. Create your digital legacy, connect with relatives, and ensure your story is told.
                        </p>
                        <a href="#video" onClick={() => onSetPage('video-will')} className="cursor-pointer bg-indigo-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-indigo-800 transition duration-300">
                            Record Your Legacy Video
                        </a>
                    </div>
                </div>

                {/* Hallmarks Section */}
                <section className="bg-transparent py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">Our Hallmarks</h2>
                        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-16">
                            More than just an archive. We provide a living, breathing space for your family's story to grow and be cherished for generations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-indigo-800 mb-3">Connect with Family Members</h3>
                                <a href="#" className="text-indigo-600 font-semibold hover:underline">Open All Members &rarr;</a>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-indigo-800 mb-3">Unfold the Roots of the Family</h3>
                                <a href="#" className="text-indigo-600 font-semibold hover:underline">Open Timeline &rarr;</a>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-indigo-800 mb-3">Witness History and Events</h3>
                                <a href="#" className="text-indigo-600 font-semibold hover:underline">Open History &rarr;</a>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-indigo-800 mb-3">Enjoy Past and Present Photos</h3>
                                <a href="#" className="text-indigo-600 font-semibold hover:underline">Open Gallery &rarr;</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* "Get Started Now" Form Section (NOW MULTI-STEP) */}
                <section className="container mx-auto max-w-4xl px-6 py-16">
                    
                    {/* Title for form area */}
                    <div className="text-left mb-6">
                        <span className="text-indigo-600 font-semibold">Step {formStep} of 3</span>
                        <h2 className="text-4xl font-bold text-indigo-900 mt-2">Get Started Now</h2>
                    </div>

                    {/* Progress Bar */}
                    <ProgressBar step={formStep} />
                    
                    {/* Render current form step */}
                    {formStep === 1 && <FormStep1 setFormStep={setFormStep} />}
                    {formStep === 2 && <FormStep2 setFormStep={setFormStep} />}
                    {formStep === 3 && <FormStep3 onProceed={handleSubmit} setFormStep={setFormStep} />}

                </section>
            </div>
    );
};

export default HomePage;