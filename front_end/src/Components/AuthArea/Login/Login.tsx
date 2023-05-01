import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Services/useAuth";
import CredentialsModel from "../../../Models/CredentialsModel";
import ToastifyService from "../../Toastify/Toastify";
import useTitle from "../../../Utils/useTitle";
import Toastify from "../../Toastify/Toastify";
import { toast } from "react-toastify";

function Login(): JSX.Element {
    
    useTitle("Login");
    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function submit(credentials: CredentialsModel) {
        const toastId = Toastify.loading();

        await login(credentials)
        .then(( ) => {
            ToastifyService.success("Welcome Back!");
            navigate("/vacations");
        })
        .catch((error) => {
            ToastifyService.error(error);
        })
        .finally(() => toast.dismiss(toastId))
    }
    

    return (
        <div className="Login">

            <form className="card" onSubmit={handleSubmit(submit)}>
                
                <div className="form_headline">
                    <h2>Log In</h2>
                </div>

                <label className="field">
                    <span>Username:</span>
                    <input className="input" type="text" {...register("userName", {required: true})} autoFocus />
                    {errors.userName && <p className="err">userName is required.</p>}
                </label>

                <label className="field">
                    <span>Password:</span>
                    <input className="input" type="password" {...register("password", {required: true})} />
                    {errors.password && <p className="err">Password is required.</p>}
                </label>
                <br/>
                <button>Login</button>
                <br />
                <small>Don't have an account? <Link to='/register'>Register</Link></small>
            </form>
        </div>
    );
}

export default Login;
