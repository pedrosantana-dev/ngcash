import React, { useContext } from 'react'
import { AuthContext } from '.'

const userAuth = () => {
    const context = useContext(AuthContext)
    return context;
}

export default userAuth