import jwtDecode from "jwt-decode";
import UserModel from "../../Models/UserModel";

export class AuthState {

    public token: string = '';
    public user: UserModel = null;

    public constructor() {
        
        this.token = sessionStorage.getItem("token") || '';
        if (this.token) {
            const jwtPayload = jwtDecode(this.token);
            console.log(jwtPayload);
            this.user = (jwtPayload as any).user;
        }        
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };
    switch (action.type) {

        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            const jwtPayload = jwtDecode(newState.token);
            newState.user = (jwtPayload as any).user;
            sessionStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            newState.token = '';
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;
}