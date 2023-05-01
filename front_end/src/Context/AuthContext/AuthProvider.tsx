import { PropsWithChildren, useReducer, useEffect } from "react";
import { AuthState, authReducer } from "./AuthReducer";
import axios from "axios";
import AuthContext from "./AuthContext";

export default function AuthProvider(props: PropsWithChildren){
    const [auth, setAuth] = useReducer(authReducer, new AuthState());

    useEffect(()=> {
        axios.interceptors.request.use(request => {
            if (auth.token) request.headers.Authorization = "Bearer " + auth.token 
            return request;
        });
    },[auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
                {props.children}
        </AuthContext.Provider>
    )
}
