import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";
import { Api } from '../../services/api';

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user);
        }
    }, [])

    async function authenticate(username: string, password: string) {
        const response = await LoginRequest(username, password)

        const payload = { token: response.access_token, username}

        setUser(payload);
        setUserLocalStorage(payload);
        Api.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
    }

    function logout() {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{ ...user, signed: !!user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}