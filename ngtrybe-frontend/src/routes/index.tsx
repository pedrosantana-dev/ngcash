import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from "./privateRoute";
import { Profile } from '../pages/Profile';
import { Login } from "../pages/Login";
import { Register } from '../pages/Register';


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}


