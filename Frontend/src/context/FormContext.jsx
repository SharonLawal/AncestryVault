import React, { useState, createContext, useCallback } from 'react';

export const FormContext = createContext();

const initialFormData = {
    step1: {
        fullname: '',
        date_of_birth: '',
        gender: '',
        profession: '',
        description: '',
        profile_picture: null,
        parent_name: '', 
        spouse_name: '', 
    },
    step2: {
        relative1Email: '',
        relative2Email: '',
        relative3Email: '',
    },
    video_description: null,
};

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(initialFormData);

    const updateStep1Data = useCallback((newData) => {
        setFormData(prev => ({
            ...prev,
            step1: { ...prev.step1, ...newData }
        }));
    }, []);

    const updateStep2Data = useCallback((newData) => {
        setFormData(prev => ({
            ...prev,
            step2: { ...prev.step2, ...newData }
        }));
    }, []);

    const updateVideoDescription = useCallback((videoBlob) => {
        setFormData(prev => ({
            ...prev,
            video_description: videoBlob
        }));
    }, []);

    return (
        <FormContext.Provider value={{ 
            formData, 
            updateStep1Data, 
            updateStep2Data, 
            updateVideoDescription
        }}>
            {children}
        </FormContext.Provider>
    );
};