import { useEffect, useState, useContext } from "react";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import useAuth from "../../../Services/useAuth";
import AuthContext from "../../../Context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useVacation from "../../../Services/useVacations";
import VacationsContext from "../../../Context/VacationContext/VacationContext";
import "./VacationList.css"
import ToastifyService from "../../Toastify/Toastify";
import useTitle from "../../../Utils/useTitle";
import Toastify from "../../Toastify/Toastify";
export default function VacationList(): JSX.Element {
    useTitle("Vacations");

    const navigate = useNavigate();
    const {vacations, setVacations} = useContext(VacationsContext);
    const [addButtonDisabled, setAddButtonDisabled] = useState(false);
    const {auth} = useContext(AuthContext);
    
    // const {} = useForm<VacationModel>();
    const {logout} = useAuth();
    const {GetAllVacations, addVacation} = useVacation()
    const [showAll, setShowAll] = useState(true);


    const getVacations = () => {

        GetAllVacations(vacations.length)
        .then(getNewVacations => {
            (getNewVacations.length < 9) && setAddButtonDisabled(true);
            (getNewVacations.length !== 0) ? ToastifyService.success("Vacation added successfully") : Toastify.message('No more vacations to show');

            console.log(getNewVacations);

            const newVacations = [...vacations, ...getNewVacations]
            setVacations(newVacations);
            console.log(vacations);
            
            
            
        })
        .catch((err: any) => ToastifyService.error(err));
    }

    const selectModeHandler = (e: any) => {
        e.target.value === "Liked" ? setShowAll(false) : setShowAll(true);
    }
    console.log(vacations);
    

    return (
        <div className="VacationList">
            {auth.user?.role === "user" ? 
                <div className="selectMode">
                    <select onChange={selectModeHandler}>
                        {/* <option selected disabled value=""></option> */}
                        <option value="All">Show All Vacations</option>
                        <option value="Liked">Show My Liked Vacations</option>
                    </select>
                </div>
                :
                <Link to="/charts" className="Rainbow">Charts</Link>
            }
            <div className="VacationsContainer">
                {vacations.map((vacation: VacationModel) => {
                    if(!showAll && !vacation.liked) {
                        return;
                    }
                    return auth.user?.role === "admin" ? <Link to={"" + vacation.vacationId}><VacationCard key={vacation.vacationId} {...vacation}/></Link> : <VacationCard key={vacation.vacationId} {...vacation}/>
                })}
            </div>
            <div className="buttonContainer">
                <button disabled={addButtonDisabled} onClick={getVacations}></button>
            </div>
        </div>
    )
}