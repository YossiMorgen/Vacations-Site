import { PropsWithChildren, useEffect, useContext, useState } from "react";
import VacationsContext from "./VacationContext";
import axios from "axios";
import appConfig from "../../Utils/AppConfig";
import AuthContext from "../AuthContext/AuthContext";
import Toastify from "../../Components/Toastify/Toastify";


export default function VacationsProvider(props: PropsWithChildren){
    const [vacations, setVacations] = useState([]);
    const {auth} = useContext(AuthContext);
    
    useEffect(() => {
        
        if(auth.token && vacations.length === 0){
            console.log(auth);
            console.log(vacations);          

            const config = {
                headers: {
                    authorization: `berear ${auth.token}`
                }
            }
            axios.get(appConfig.vacations, config)
            .then(v => {                
                setVacations(v.data)
                Toastify.success("Vacations loaded")
            })
            .catch((err: any) => Toastify.error(err));
            
        }
    }, [auth])

    return (   
        <VacationsContext.Provider value={{ vacations, setVacations }}>
            {props.children}
        </VacationsContext.Provider>
    )
}