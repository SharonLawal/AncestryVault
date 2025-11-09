import React, { useState, useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import FormInput from '../../components/common/FormInput';
import FormRadio from '../../components/common/FormRadio';
import { UploadIcon, MailIcon, LockIcon, CalendarIcon } from '../../components/common/Icons';

const FormStep1 = ({ setFormStep }) => {
    const { formData, updateStep1Data } = useContext(FormContext);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateStep1Data({ [name]: value });

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            updateStep1Data({ profilePicture: file });
            if (errors.profilePicture) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    profilePicture: null
                }));
            }
        }
    };

    const validate = () => {
        const newErrors = {};
        const data = formData.step1;

        if (!data.fullName) newErrors.fullName = "Full name is required.";
        if (!data.email) newErrors.email = "Email is required.";
        if (!data.secretCode) newErrors.secretCode = "Secret code is required.";
        if (data.secretCode !== data.confirmSecretCode) newErrors.confirmSecretCode = "Secret codes do not match.";
        if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
        if (!data.gender) newErrors.gender = "Gender is required.";
        if (!data.profilePicture) newErrors.profilePicture = "Profile picture is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProceed = () => {
        if (validate()) {
            setFormStep(2);
        }
    };
    
    const data = formData.step1;

    return (
        <form id="signup-form-step1" className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Role Selector */}
            <fieldset className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <legend className="sr-only">Select your role</legend>
                <FormRadio name="role" id="role_grandparent" label="Grandparent" checked={data.role === 'Grandparent'} onChange={handleChange} />
                <FormRadio name="role" id="role_parent" label="Parent" checked={data.role === 'Parent'} onChange={handleChange} />
                <FormRadio name="role" id="role_descendant" label="Descendant" checked={data.role === 'Descendant'} onChange={handleChange} />
                <FormRadio name="role" id="role_lawyer" label="Family Lawyer" checked={data.role === 'Family Lawyer'} onChange={handleChange} />
            </fieldset>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-6">
                    <FormInput name="fullName" label="Full Name" placeholder="Enter your full name here" required={true} value={data.fullName} onChange={handleChange} error={errors.fullName} />
                    <FormInput name="email" label="Email" type="email" placeholder="johndoe@gmail.com" icon={<MailIcon />} required={true} value={data.email} onChange={handleChange} error={errors.email} />
                    <FormInput name="secretCode" label="Family Secret Code" type="password" placeholder="Enter the family secret code" icon={<LockIcon />} required={true} value={data.secretCode} onChange={handleChange} error={errors.secretCode} />
                    <FormInput name="parentName" label="Parent's Name" placeholder="Enter your parent's name" icon={<span className="text-gray-400">@</span>} value={data.parentName} onChange={handleChange} />
                    <FormInput name="dateOfBirth" label="Date of Birth" type="date" placeholder="Enter your date of Birth" icon={<CalendarIcon />} required={true} value={data.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
                     <div>
                        <label htmlFor="numChildren" className="block text-gray-700 mb-2 font-semibold">Number of Children</label>
                        <select id="numChildren" name="numChildren" value={data.numChildren} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Select your number of children</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3+">3+</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className="h-24 hidden md:block"></div> 
                    <div className="h-24 hidden md:block"></div>
                    <FormInput name="confirmSecretCode" label="Confirm Family Secret Code" type="password" placeholder="Confirm the family secret code" icon={<LockIcon />} required={true} value={data.confirmSecretCode} onChange={handleChange} error={errors.confirmSecretCode} />
                    <FormInput name="spouseName" label="Spouse's Name" placeholder="Enter your spouse's name" icon={<span className="text-gray-400">@</span>} value={data.spouseName} onChange={handleChange} />
                    <div>
                        <label htmlFor="gender" className="block text-gray-700 mb-2 font-semibold">Gender <span className="text-red-500">*</span></label>
                        <select id="gender" name="gender" value={data.gender} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border ${errors.gender ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-900 focus:outline-none focus:ring-2 ${errors.gender ? 'ring-red-500' : 'ring-indigo-500'}`}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                    <FormInput name="profession" label="Profession" placeholder="Enter your profession here" value={data.profession} onChange={handleChange} />
                </div>
            </div>

            {/* Image Upload */}
            <div className="pt-6">
                <label className="block text-gray-700 mb-2 font-semibold">
                    Profile Picture <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed ${errors.profilePicture ? 'border-red-500' : 'border-gray-400'} rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer`} style={{ backgroundColor: '#E6E6FA' }} onClick={() => document.getElementById('profilePicture').click()}>
                    <input type="file" id="profilePicture" name="profilePicture" accept="image/*,application/pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                    <UploadIcon />
                    <span className="mt-2 block text-gray-600">
                        {data.profilePicture ? `File: ${data.profilePicture.name}` : 'Click here to upload a profile picture'}
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">Maximum of 50MB</span>
                </div>
                {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
                <button type="button" onClick={handleProceed} className="w-full bg-indigo-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-800 transition duration-300 text-lg">
                    Proceed to Step 2: Invite Family
                </button>
            </div>
        </form>
    );
};

export default FormStep1;