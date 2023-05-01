import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/AppConfig";
import "./VacationCard.css"
import like from "../../../Assets/Images/like.png";
import unlike from "../../../Assets/Images/unlike.png";
import { ChangeEventHandler, useContext } from "react";
import likesService from "../../../Services/likesService";
import AuthContext from "../../../Context/AuthContext/AuthContext";
import useVacation from "../../../Services/useVacations";
import { Link } from "react-router-dom";
import VacationsContext from "../../../Context/VacationContext/VacationContext";


export default function VacationCard(vacation: VacationModel){
    const { auth } = useContext(AuthContext)
    const { deleteVacation } = useVacation();
    const {vacations, setVacations} = useContext(VacationsContext);

    const likeClickHandler = async () => {
        try {
            const like = {
                userId: auth.user?.userId, 
                vacationId: vacation.vacationId, 
                liked: vacation.liked
            }
            await likesService(like);

            setVacations(vacations.map((v: VacationModel) => {
                if(v.vacationId!== vacation.vacationId) return v;
    
                v.liked = !v.liked;
                v.likes = v.liked? v.likes + 1 : v.likes - 1;
                
                return v;
            }));
        } catch (error: any) {
            alert(error.message);
        }
    }

    const deleteHandler = async () => {

        if(!window.confirm("Are you sure you want to delete this vacation?")) return;

        try {
            await deleteVacation(vacation.vacationId)
        } catch (error:any) {
            alert(error.message);            
        }
    }
    return ( 
        <div className="VacationCard" >
            <div className="img-container">
                <div style={{backgroundImage: `url(${vacation.imageName})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}} className="before">            </div>
            </div>
            
            <div className="VacationInfo">
                <h3>{vacation.destination}</h3>
                <div >
        
                    {auth.user?.role === "user" &&
                        <div className="likeArea">
                            {vacation.likes > 0 && 
                                <small>
                                    {vacation.likes} liked 
                                </small>
                            } 
                            <button onClick={likeClickHandler} className="likeButton">
                            <img className="like" src={ (vacation.liked ? like : unlike) } alt="" />
                            </button>
                        </div>
                        
                    }
                    <p> {vacation.description} </p>
                    <span className="price"> - {vacation.price} - </span>
                    <span className="Date">{new Date(vacation.start).toLocaleDateString() + " : " + new Date(vacation.end).toLocaleDateString()}</span>
            
                </div>
            </div>
            {auth.user?.role === "admin" &&
                <div className="adminButtonsContainer">
                    <button onClick={ deleteHandler }>❌</button>
                </div> 
            }
        </div>
    )
}