import React from 'react';

const ProgressBar = ({ step }) => {
    const width = step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%';
    return (
        <div className="w-full h-2 bg-gray-300 rounded-full mb-12">
            <div 
                className="h-2 bg-indigo-500 rounded-full transition-all duration-300" 
                style={{ width: width }}
            ></div>
        </div>
    );
};

export default ProgressBar;