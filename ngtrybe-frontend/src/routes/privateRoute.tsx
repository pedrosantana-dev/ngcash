import { Navigate, Outlet } from 'react-router-dom';
import userAuth from '../context/AuthProvider/userAuth'

export const PrivateRoute = () => {

    const { signed } = userAuth()

    return signed ? <Outlet /> : <Navigate to="/login" />
}
