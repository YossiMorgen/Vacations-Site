import { useForm } from "react-hook-form";
import "./AddVacation.css";
import {toast} from "react-toastify"
import VacationModel from "../../../Models/VacationModel";
import { useNavigate } from "react-router-dom";
import useVacation from "../../../Services/useVacations";
import img from "../../../Assets/Images/like.png"
import { forEachChild } from "typescript";
import { useEffect, useState } from "react";
import VacationCard from "../VacationCard/VacationCard";
import Toastify from "../../Toastify/Toastify";
import useTitle from "../../../Utils/useTitle";

export default function AddVacation(): JSX.Element {
    useTitle("add vacation");
    const { addVacation } = useVacation();
    const { register,  handleSubmit, formState: { errors, isLoading  } } = useForm<VacationModel>();
    const navigate = useNavigate();
    
    async function submit(vacation: VacationModel) {
            if(vacation.start > vacation.end) {
                Toastify.warning("Start date must be before end date");
                return;
            }
            const toastId = Toastify.loading();


            // const form = document.querySelector("form")!;
            const formData = new FormData();
            formData.append("destination", vacation.destination);
            formData.append("description", vacation.description);
            formData.append("start", vacation.start.toString());
            formData.append("end", vacation.end.toString());
            formData.append("price", vacation.price.toString());
            formData.append("image", vacation.image[0]);

            // formData.forEach((value, key) => {
            //     console.log(key + ": " + value)
            // })
            await addVacation(formData)
            .then(() => {
                Toastify.success("Vacation added successfully")
                navigate("/vacations")
            })
            .catch((err:any) => Toastify.error(err))
            .finally(() => toast.dismiss(toastId));
        
    }

    // didn't activate because of error "Not allowed to load local resource"
    // const updateCard = (e: any) => {
        
    //     if(e.target.name === "image") {
    //         setValue("imageName", e.target.value); 
    //     }
    //     const newVacation = {...getValues()}
     
    //     setVacation({...newVacation});
        
    //     console.log(vacation);
        
    // }

    return (
        <div className="AddVacation">
            <form  className="form card" onSubmit={handleSubmit(submit)}>
                {/* <div className="VacationCard" >
                    <div className="img-container">
                        <div style={{backgroundImage: `url(${vacation.imageName})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}} className="before">            </div>
                    </div>
                    <div className="VacationInfo">
                        <div> {vacation.description} </div>
                        <span>{new Date(vacation.start).toLocaleDateString() + " : " + new Date(vacation.end).toLocaleDateString()}</span>
                        <span className="price"> - {vacation.price} - </span>
                    </div>
                </div> */}
                <div className="form_headline">
                    <h2>Add Vacation</h2>
                </div>

                <label  className="field">
                    <span>Destination:</span>
                    <input className="input" type="text" {...register("destination", {required: true})} autoFocus />
                    {errors.destination && <p className="err">Destination is required.</p>}
                </label>

                <label  className="field">
                    <span>Description:</span>
                    <input className="input" type="text" {...register("description", {required: true})} autoFocus />
                    {errors.description && <p className="err">description is required.</p>}
                </label>

                <label className="field">
                    <span>Price:</span>
                    <input className="input" type="number" step='0.01' {...register("price", {required: true})} autoFocus />
                    {errors.price && <p className="err">Price is required.</p>}
                </label>

                <label className="field" >
                    <span>Start date:</span>
                    <input className="input" type="datetime-local" {...register("start", {required: true})} autoFocus />
                    {errors.start && <p className="err">Start date is required.</p>}
                </label>

                <label className="field">
                    <span>End date:</span>
                    <input className="input" type="datetime-local" {...register("end", {required: true})} autoFocus />
                    {errors.end && <p className="err">End date is required.</p>}
                </label>

                <label className="field imageLabel" >
                    <input className="input"  accept="image/*" type="file" {...register("image", {required: true})} autoFocus />
                    {errors.image && <p className="err">Image is required.</p>}
                </label>

                <button> Submit </button>
            </form>
        </div>
    )
} 