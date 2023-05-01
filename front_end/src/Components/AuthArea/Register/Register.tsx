import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Services/useAuth";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState, ChangeEvent } from "react";
import ToastifyService from "../../Toastify/Toastify";
import AuthContext from "../../../Context/AuthContext/AuthContext";
import { useContext } from "react";
import useTitle from "../../../Utils/useTitle";
import Toastify from "../../Toastify/Toastify";
import { toast } from "react-toastify";

function Register(): JSX.Element {
    useTitle("Register");
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const [recaptcha, setRecaptcha] = useState<string>('')
    const {auth} = useContext(AuthContext)
    console.log(recaptcha);
    
    const verifyReCaptcha = (key: string):void => {
        setRecaptcha(key);
    }
    async function submit(data: any) {
        
            data.recaptcha = recaptcha;
            const toastId = Toastify.loading();

            await registerUser(data)
            .then(() => {
                ToastifyService.success(`welcome `);
                navigate("/vacations");
            })
            .catch((err) => {
            ToastifyService.error(err);
            })
            .finally(() => toast.dismiss(toastId));
    }

    return (
        <div className="Register">

            <form className="form card" onSubmit={handleSubmit(submit)}>
                <div className="form_headline">
                    <h2>Register</h2>
                </div>
                <label className="field">
                    <span>First Name</span>
                    <input className="input" type="text" {...register("firstName", {required: true})} autoFocus />
                    {errors.firstName && <p className="err">First name is required.</p>}
                </label>

                <label className="field">
                    <span>Last Name</span>
                    <input className="input" type="text" {...register("lastName", {required: true})} />
                    {errors.lastName && <p className="err">Last name is required.</p>}
                </label>

                <label className="field">
                    <span>userName</span><br/>
                    <input className="input" type="text" {...register("userName", {required: true})}  />
                    {errors.userName && <p className="err">userName is required.</p>}
                </label>

                <label className="field">
                    <span>Password</span>
                    <input className="input" type="password" {...register("password", {required: true})}  />
                    {errors.password && <p className="err">Password is required.</p>}
                </label>               

                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={verifyReCaptcha}/>
                <button>Register</button>
                {/*  disabled={recaptcha === ''} */}
                <br />

                <small>Already have an account? <Link to='/login' >Log In</Link></small>
            </form>

        </div>
    );
}

export default Register;