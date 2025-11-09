import React, { useState, createContext } from 'react';

// Create a Context to hold all form data
export const FormContext = createContext();

const initialFormData = {
    step1: {
        role: 'Grandparent',
        fullName: '',
        email: '',
        secretCode: '',
        confirmSecretCode: '',
        parentName: '',
        spouseName: '',
        dateOfBirth: '',
        gender: '',
        numChildren: 0,
        profession: '',
        profilePicture: null,
    },
    step2: {
        relative1Email: '',
        relative2Email: '',
        relative3Email: '',
    }
};

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(initialFormData);

    const updateStep1Data = (data) => {
        setFormData(prev => ({ ...prev, step1: { ...prev.step1, ...data } }));
    };

    const updateStep2Data = (data) => {
        setFormData(prev => ({ ...prev, step2: { ...prev.step2, ...data } }));
    };

    return (
        <FormContext.Provider value={{ formData, updateStep1Data, updateStep2Data }}>
            {children}
        </FormContext.Provider>
    );
};