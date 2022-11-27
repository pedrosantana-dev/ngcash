import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { FormInput } from '../../components/FormInput/FormInput'
import { Api } from '../../services/api';

import './register.css'

export const Register = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "Username deve ter no minimo 3 caracteres",
            label: "Username",
            pattern: "[A-Za-z0-9]{3,}",
            required: true
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password deve ser maior ou igual a 8 caracteres e ter pelo menos 1 numero e uma letra maiúscula",
            label: "Password",
            pattern: "^(?=.*\d)(?=.*[A-Z])(?=.*[A-Za-z0-9]).{8,}",
            required: true
        },
        {
            id: 3,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Os passwords não correspondem",
            label: "Confirm Password",
            pattern: values.password,
            required: true
        },
    ]

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        let { confirmPassword, ...user} = values;
        try {
            await Api.post('/users', user)
            return <Navigate to="/login" />
        } catch (error: any) {
            console.log(error.response.data)
        }        
    }

    const onChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        console.log(values)
    }

    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <h1>Registrar</h1>
                {inputs.map((input) => {
                    let { id, ...rest} = input
                    return (
                        <FormInput key={input.id}
                            {...rest}
                            defaultValue={Object(values)[input.name]}
                            errorMessage={input.errorMessage}
                            onChange={onChange} />
                    )
                }
                )}

                <button>Registrar</button>
            </form>
        </div>
    )
}
