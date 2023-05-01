import { useContext } from 'react';
import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationModel from "../Models/VacationModel";
import AuthContext from '../Context/AuthContext/AuthContext';
import useAuth from './useAuth';
import VacationsContext from '../Context/VacationContext/VacationContext';

export default function useVacation(){
    const {logout} = useAuth();
    const {vacations, setVacations} = useContext(VacationsContext)

    const GetAllVacations = async(start:number): Promise<VacationModel[]> => {
        const response = await axios.get<VacationModel[]>(appConfig.vacations + "?start=" + start);
        if(response.status === 401) logout();
        const vacations = response.data;
        return vacations;
    }

    const addVacation = async(vacation: FormData): Promise<VacationModel> => {

        const response = await axios.post(appConfig.vacations, vacation);
        if(response.status === 401) logout();
        const newVacation = response.data;
        return newVacation;

    }

    const UpdateVacation = async(id: number, vacation: FormData): Promise<VacationModel> => {

        const response = await axios.put(`${appConfig.vacations}/${id}`, vacation);
        if(response.status === 401) logout();
        const newVacation = response.data;
        return newVacation;  
        
    }

    const deleteVacation = async(id: number): Promise<void> => {
        const response = await axios.delete(`${appConfig.vacations}/${id}`);
        if(response.status === 401) logout();
        setVacations(vacations.filter((vacation: VacationModel) => vacation.vacationId !== id));
    }

    return{
        GetAllVacations,
        addVacation,
        UpdateVacation,
        deleteVacation
    }

}





// class VacationsService {

//     public async getAllVacations(): Promise<Array<VacationModel[] | number> > {
//         const response = await axios.get<VacationModel[]>(appConfig.vacations);
//         const vacations = response.data;
//         return [vacations, response.status];
//     }
//     public async addVacation(vacation: VacationModel): Promise<Array<VacationModel | number>> {
//         const response = await axios.post(appConfig.vacations, vacation);
//         const newVacation = response.data;
//         return [newVacation, response.status];
//     }
// }

// export const useVacationsMiddleWare = async(callBack: Function) => {
//     const { logout } = useAuth();
//     const [data, status] = await callBack();
//     if (status === 401) logout();
//     return [data];
// }

// const vacationsService = new VacationsService();

// export default vacationsService;
