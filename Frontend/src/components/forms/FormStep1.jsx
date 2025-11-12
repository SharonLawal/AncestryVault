import React, { useState, useContext, useEffect } from 'react';
import { FormContext } from '../../context/FormContext';
import FormInput from '../../components/common/FormInput';
import { UploadIcon } from '../../components/common/Icons';

// This is the new FormStep1, aligned with your Django `Person` model.
const FormStep1 = ({ setFormStep }) => {
    const { formData, updateStep1Data } = useContext(FormContext);
    const [errors, setErrors] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null); // State for the image preview URL

    // Clean up the object URL to prevent memory leaks
    useEffect(() => {
        // This is a cleanup function that runs when the component unmounts
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateStep1Data({ [name]: value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Revoke the old URL if one exists
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            
            // Create a new URL for the selected file
            setPreviewUrl(URL.createObjectURL(file));
            
            updateStep1Data({ profile_picture: file });
            if (errors.profile_picture) {
                setErrors(prev => ({ ...prev, profile_picture: null }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const { step1 } = formData;

        if (!step1.fullname) newErrors.fullname = 'Full name is required.';
        if (!step1.date_of_birth) newErrors.date_of_birth = 'Date of birth is required.';
        if (!step1.gender) newErrors.gender = 'Gender is required.';
        
        // profile_picture is required in our UI, matching the asterisk
        if (!step1.profile_picture) newErrors.profile_picture = 'Profile picture is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateForm()) {
            setFormStep(2);
        }
    };

    return (
        <form id="signup-form-step1" className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Form Fields Grid - Aligned to Django Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Column 1 */}
                <div className="space-y-6">
                    <FormInput 
                        label="Full Name"
                        name="fullname"
                        placeholder="Enter your full name here"
                        value={formData.step1.fullname}
                        onChange={handleChange}
                        error={errors.fullname}
                        required={true}
                    />
                    <FormInput 
                        label="Date of Birth"
                        name="date_of_birth"
                        type="date"
                        value={formData.step1.date_of_birth}
                        onChange={handleChange}
                        error={errors.date_of_birth}
                        required={true}
                    />
                    <FormInput 
                        label="Parent's Name"
                        name="parent_name"
                        placeholder="Enter your parent's name"
                        value={formData.step1.parent_name}
                        onChange={handleChange}
                        // This field is for linking, so not "required" in the validation
                    />
                    <FormInput 
                        label="Profession"
                        name="profession"
                        placeholder="Enter your profession here"
                        value={formData.step1.profession}
                        onChange={handleChange}
                    />
                </div>
                
                {/* Column 2 */}
                <div className="space-y-6">
                     <div>
                        <label htmlFor="gender" className="block text-gray-700 mb-2 font-semibold">
                            Gender <span className="text-red-500">*</span>
                        </label>
                        <select 
                            id="gender"
                            name="gender"
                            value={formData.step1.gender}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.gender ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:outline-none focus:ring-2 ${errors.gender ? 'ring-red-500' : 'ring-indigo-500'}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>

                     <FormInput 
                        label="Spouse's Name"
                        name="spouse_name"
                        placeholder="Enter your spouse's name"
                        value={formData.step1.spouse_name}
                        onChange={handleChange}
                    />
                    
                    {/* Description Text Area */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 mb-2 font-semibold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Tell us a bit about yourself..."
                            value={formData.step1.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Image Upload */}
            <div className="pt-6">
                <label className="block text-gray-700 mb-2 font-semibold">
                    Profile Picture <span className="text-red-500">*</span>
                </label>
                <div 
                    className={`border-2 border-dashed ${errors.profile_picture ? 'border-red-500' : 'border-gray-400'} rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer overflow-hidden`} 
                    style={{ backgroundColor: '#E6E6FA' }}
                    onClick={() => document.getElementById('profile_picture_input').click()}
                >
                    {/* CONDITIONAL RENDER: Show preview or upload icon */}
                    {previewUrl ? (
                        <div className="relative">
                            <img src={previewUrl} alt="Profile Preview" className="w-full h-48 object-cover rounded-md" />
                            <span className="mt-2 block text-gray-600">Click to change picture</span>
                        </div>
                    ) : (
                        <div className="p-6">
                            <UploadIcon />
                            <span className="mt-2 block text-gray-600">Click here to upload a profile picture</span>
                            <span className="mt-1 block text-sm text-gray-500">Maximum of 50MB</span>
                        </div>
                    )}
                    
                    <input 
                        type="file" 
                        id="profile_picture_input"
                        name="profile_picture"
                        className="hidden" 
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                {errors.profile_picture && <p className="text-red-500 text-sm mt-1">{errors.profile_picture}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
                <button type="button" onClick={handleNext} className="w-full bg-indigo-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-800 transition duration-300 text-lg">
                    Proceed to Step 2: Invite Family
                </button>
            </div>
        </form>
    );
};

export default FormStep1;