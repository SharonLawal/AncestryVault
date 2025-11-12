import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

const FormStep3 = ({ onProceed, setFormStep }) => {
    const { formData } = useContext(FormContext);
    const { step1, step2, video_description } = formData;
    const invites = [step2.relative1Email, step2.relative2Email, step2.relative3Email].filter(Boolean);

    return (
        <div id="signup-form-step3" className="space-y-8">
            <h2 className="text-3xl font-bold text-indigo-900">Review & Confirm</h2>
            <p className="text-gray-700">
                Please review your information. You can go back to change any details.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 space-y-4">
                <h3 className="text-xl font-semibold text-indigo-800 border-b pb-2">Your Profile</h3>
                <p className="text-gray-700"><strong>Name:</strong> {step1.fullname || 'N/A'}</p>
                <p className="text-gray-700"><strong>Date of Birth:</strong> {step1.date_of_birth || 'N/A'}</p>
                <p className="text-gray-700"><strong>Gender:</strong> {step1.gender || 'N/A'}</p>
                <p className="text-gray-700"><strong>Profession:</strong> {step1.profession || 'N/A'}</p>
                <p className="text-gray-700"><strong>Parent's Name:</strong> {step1.parent_name || 'N/A'}</p>
                <p className="text-gray-700"><strong>Spouse's Name:</strong> {step1.spouse_name || 'N/A'}</p>
                <p className="text-gray-700"><strong>Description:</strong> {step1.description || 'N/A'}</p>
                <p className="text-gray-700"><strong>Profile Picture:</strong> {step1.profile_picture ? step1.profile_picture.name : 'N/A'}</p>
                
                <h3 className="text-xl font-semibold text-indigo-800 border-b pb-2 mt-6">Family Invites</h3>
                <p className="text-gray-700"><strong>Invites Sent:</strong> {invites.length > 0 ? invites.join(', ') : 'N/A'}</p>
                
                <h3 className="text-xl font-semibold text-indigo-800 border-b pb-2 mt-6">Legacy Video</h3>
                <p className="text-gray-700"><strong>Video Status:</strong> {video_description ? 'Recorded' : 'Not Recorded'}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button type="button" onClick={() => setFormStep(2)} className="w-full bg-gray-300 text-gray-800 py-4 px-6 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 text-lg">
                    Back to Step 2
                </button>
                <button 
                    type="button" 
                    onClick={onProceed}
                    className="w-full bg-indigo-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-800 transition duration-300 text-lg"
                >
                    Confirm & Proceed
                </button>
            </div>
        </div>
    );
};

export default FormStep3;