import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import FormInput from '../common/FormInput';
import { UserPlusIcon } from '../common/Icons';

const FormStep2 = ({ setFormStep }) => {
    const { formData, updateStep2Data } = useContext(FormContext);

    const handleChange = (e) => {
        updateStep2Data({ [e.target.name]: e.target.value });
    };

    return (
        <form id="signup-form-step2" className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-3xl font-bold text-indigo-900">Invite Your Family</h2>
            <p className="text-gray-700">
                Send invitations to family members so they can connect to the family archive. You can always do this later.
            </p>
            
            <div className="space-y-6">
                <FormInput name="relative1Email" label="Relative 1 Email" type="email" placeholder="relative1@family.com" icon={<UserPlusIcon />} value={formData.step2.relative1Email} onChange={handleChange} />
                <FormInput name="relative2Email" label="Relative 2 Email" type="email" placeholder="relative2@family.com" icon={<UserPlusIcon />} value={formData.step2.relative2Email} onChange={handleChange} />
                <FormInput name="relative3Email" label="Relative 3 Email" type="email" placeholder="relative3@family.com" icon={<UserPlusIcon />} value={formData.step2.relative3Email} onChange={handleChange} />
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button type="button" onClick={() => setFormStep(1)} className="w-full bg-gray-300 text-gray-800 py-4 px-6 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 text-lg">
                    Back to Step 1
                </button>
                <button type="button" onClick={() => setFormStep(3)} className="w-full bg-indigo-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-800 transition duration-300 text-lg">
                    Proceed to Step 3: Review
                </button>
            </div>
             <div className="text-center">
                <button type="button" onClick={() => setFormStep(3)} className="text-indigo-600 hover:underline">
                    Skip for now
                </button>
            </div>
        </form>
    );
};

export default FormStep2;