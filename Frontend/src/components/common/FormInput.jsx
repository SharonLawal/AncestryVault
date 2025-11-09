import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './Icons.jsx';

const FormInput = ({ name, label, type = "text", placeholder, icon, required = false, value, onChange, error }) => {
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-2 font-semibold">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}
                <input 
                    type={inputType}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full py-3 pr-12 rounded-lg bg-white text-gray-900 border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 ${error ? 'ring-red-500' : 'ring-indigo-500'} ${icon ? 'pl-11' : 'pl-4'}`}
                />
                {type === "password" && (
                     <div 
                        className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        role="button"
                     >
                         {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                     </div>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;