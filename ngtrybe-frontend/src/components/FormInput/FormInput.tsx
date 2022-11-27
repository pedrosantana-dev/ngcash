import React, { InputHTMLAttributes, useState } from 'react'

import './formInput.css';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    refer?: React.LegacyRef<HTMLInputElement>;
    label?: string
    errorMessage?: string;
}

export const FormInput = (props: FormInputProps) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, ...inputProps} = props;

    const handleFocus = (e: any) => {
        setFocused(true);
    }

    return (
        <div className='formInput'>
            <label>{label}</label>
            <input
                {...inputProps}
                onBlur={handleFocus}
                onFocus={() => inputProps.name==="confirmPassword" && setFocused(true)}
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    )
}
