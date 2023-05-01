import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import UserModel from "../Models/UserModel";
import { AuthActionType } from '../Context/AuthContext/AuthReducer';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext/AuthContext';
import CredentialsModel from '../Models/CredentialsModel';
import ToastifyService from '../Components/Toastify/Toastify';

function useAuth() {

    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate();

    async function registerUser(user: any): Promise<void> {
        const response = await axios.post<string>(appConfig.register, user);
        const token = response.data;
        setAuth({ type: AuthActionType.Register, payload: token });        
    }

    async function login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.login, credentials);
        const token = response.data;
        setAuth({ type: AuthActionType.Login, payload: token });
    }
 

    function logout(): void {
        setAuth({ type: AuthActionType.Logout });
        sessionStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1000);
    }

    // function getTokenHeader(): object {
    //     const token = "Bearer " + sessionStorage.getItem('token');
    //     return {"Authorization": token};
    // }

    return {
        registerUser,
        login,
        logout,
    }

}

export default useAuth;