import React from 'react';

const InputField = (props) => {
    const { type, data, name, handleChange, label, error } = props;

    return (
        <div className="flex flex-col items-start px-2 shadow-md">
            <label className="font-bold mb-1" htmlFor={name}> {label}</label>
            <input 
                type={type} 
                id={name} 
                name={name} 
                value={data} 
                onChange={handleChange} 
                placeholder={label}
                required
                className={`border-2 w-full py-1 rounded-md outline-none focus:border-purple-500 ${
                    error ? 'border-red-500' : 'border-purple-300'
                }`}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}

export default InputField;
