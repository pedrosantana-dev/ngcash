import React, { useRef } from 'react'
import { Navigate } from 'react-router-dom'
import userAuth from '../../context/AuthProvider/userAuth'
import { FormInput } from '../../components/FormInput/FormInput'

import './login.css';

export const Login = () => {
    const { authenticate, signed } = userAuth()
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // const data = new FormData(e.target)
        // console.log(Object.fromEntries(data.entries()))
        try {
            await authenticate(e.target.username.value, e.target.password.value)            
        } catch (error) {
            alert('Username e/ou password inválido!')
        }
    }

    if (signed) return <Navigate to="/profile" />;

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <FormInput name="username" refer={usernameRef} placeholder='Username' />
                <FormInput type="password" name="password" refer={passwordRef} placeholder='Password' />
                <button>Login</button>
            </form>

        </div>
    )
}