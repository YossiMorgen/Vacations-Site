import { useForm } from "react-hook-form";
import "./UpdateVacation.css";
import { useContext, useState, useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import { useNavigate, useParams } from "react-router-dom";
import useVacation from "../../../Services/useVacations";
import VacationCard from "../VacationCard/VacationCard";
import VacationsContext from "../../../Context/VacationContext/VacationContext";
import ToastifyService from "../../Toastify/Toastify";
import useTitle from "../../../Utils/useTitle";
import { toast } from "react-toastify";
import Toastify from "../../Toastify/Toastify";

export default function UpdateVacation(): JSX.Element {
    useTitle("Update Vacation");

    const id = +useParams().id;
    const {vacations, setVacations} = useContext(VacationsContext);
    const { UpdateVacation } = useVacation();
    const { register, getValues, setValue, handleSubmit, formState: { errors, isLoading  } } = useForm<VacationModel>();
    const navigate = useNavigate();

    useEffect(() => {
        if(vacations.length > 0){
            const vacation: VacationModel = vacations.find((v: VacationModel) => v.vacationId === id);
            setValue("destination", vacation.destination);
            setValue("description", vacation.description);
            setValue("start", vacation.start);
            setValue("end", vacation.end);
            setValue("price", vacation.price);
            setValue("imageName", vacation.imageName);

        }   
    }, [vacations])

    async function submit(vacation: VacationModel) {
            if(vacation.start > vacation.end) {
                alert("The start date must be before the end date");
                return;
            }
            const submitVacation = new FormData();
            const toastId = Toastify.loading();

            submitVacation.append("destination", vacation.destination);
            submitVacation.append("description", vacation.description);
            submitVacation.append("start", vacation.start.toString());
            submitVacation.append("end", vacation.end.toString());
            submitVacation.append("price", vacation.price.toString());
            submitVacation.append("image", vacation.image[0]);
            submitVacation.append("imageName", vacation.imageName);

            await UpdateVacation(id, submitVacation)
            .then((newVacation: VacationModel) => {
                
                setVacations(vacations.map((v: VacationModel) => {
                    if(v.vacationId === id) return newVacation;
                    return v;
                }))

                ToastifyService.success("Vacation Uploaded!");
                navigate("/vacations");
            })
            .catch((error : any) => {
                ToastifyService.error(error);
            })
            .finally(() => toast.dismiss(toastId));
    }
    
    return (
        <div className="UpdateVacation">

            {/* <div className="VacationAddCard" >
                <div className="AddImageContainer">
                    <div style={{backgroundImage: `url(${vacation.imageName})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}} className="before">            </div>
                </div>
                
                <div className="VacationAddInfo">
                    <div> {vacation.description} </div>
                    <span>{new Date(vacation.start).toLocaleDateString() + " : " + new Date(vacation.end).toLocaleDateString()}</span>
                    <span className="price"> - {vacation.price} - </span>
                </div>
            </div> */}

            <form className="card" onSubmit={handleSubmit(submit)}>
                <div className="form_headline">
                    <h2>Update Vacation</h2>
                </div>

                <label className="field" >
                    <span>Destination:</span>
                    <input className="input" type="text" {...register("destination")} autoFocus />
                    {errors.destination && <p className="err">Destination is required.</p>}
                </label>

                <label className="field" >
                    <span>Description:</span>
                    <input className="input" type="text" {...register("description")} />
                    {errors.description && <p className="err">description is required.</p>}
                </label>

                <label className="field" >
                    <span>Price:</span>
                    <input className="input" type="number" {...register("price")} />
                    {errors.price && <p className="err">Price is required.</p>}
                </label>

                <label className="field" >
                    <span>Start date:</span>
                    <input className="input" type="datetime-local" {...register("start")} />
                    {errors.start && <p className="err">Start date is required.</p>}
                </label>

                <label className="field" >
                    <span>End date:</span>
                    <input className="input" type="datetime-local" {...register("end")} />
                    {errors.end && <p className="err">End date is required.</p>}
                </label>

                <label className="field" >
                    <input className="input" type="file" {...register("image")} />
                    {errors.image && <p className="err">Image is required.</p>}
                </label>

                <button> Edit </button>
            </form>
        </div>
    )
} 