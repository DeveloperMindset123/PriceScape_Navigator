const predefinedTailwindCSSClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

import React from 'react'

type FixInputProps = {
    handleChange : any,
    value : any,
    labelText : any,
    labelFor : any,
    id : any,
    name : any,
    type : any,
    isRequired : any,
    placeholder: any,
    customClass : any
  };

const Input : React.FC<FixInputProps> = ({ handleChange, value, labelText, labelFor, id, name, type, isRequired, placeholder, customClass }) => {
  return (
    <div className='my-5'>
        <label htmlFor={labelFor} className='sr-only'>{labelText}</label>
        <input 
            onChange={handleChange}
            value={value}
            id={id}
            name={name}
            type={type}
            required={isRequired}
            className={predefinedTailwindCSSClass+customClass}
            placeholder={placeholder}
        />
    </div>
  )
}

export default Input;