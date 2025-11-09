import React from 'react';

const FormRadio = ({ name, id, label, checked, onChange }) => (
    <div>
        <input 
            type="radio" 
            name={name} 
            id={id} 
            className="peer hidden" 
            checked={checked}
            onChange={onChange}
            value={label}
        />
        <label 
            htmlFor={id} 
            className="flex items-center justify-center w-full px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 cursor-pointer peer-checked:bg-indigo-700 peer-checked:text-white peer-checked:border-indigo-700 transition"
        >
            <span className="text-sm font-semibold">{label}</span>
        </label>
    </div>
);

export default FormRadio;