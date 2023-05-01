import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import useAuth from "../../../Services/useAuth";
import VacationList from "../../VacationArea/VacationList/VacationList";
import{ useEffect, useContext, useState } from 'react'
import AuthContext from "../../../Context/AuthContext/AuthContext";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationArea/UpdateVacation/UpdateVacation";
import Charts from "../../Charts/Charts";
function Routing(): JSX.Element {
    const { auth, setAuth } = useContext(AuthContext)
    const [isLoggedIn, setIsLoggedIn] = useState(!(auth.token === ''));
    const [isAdmin, setIsAdmin] = useState(true);
    
    useEffect(()=>{
        setIsLoggedIn(!(auth.token === ''))
        setIsAdmin(auth.user?.role === 'admin');
    },[auth])
    
    return (
        <main className="Routing">
			<Routes>
                <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to="/vacations" /> } /> 
                <Route path='/register' element={!isLoggedIn ? <Register/> : <Navigate to="/vacations" />} /> 
                <Route path='/vacations' element={isLoggedIn ? <VacationList /> : <Navigate to="/login" />} />
                {isAdmin && <Route path='/vacations/:id' element={ <UpdateVacation /> } />}
                {isAdmin && <Route path='/charts' element={ <Charts /> } />}
                {isAdmin && <Route path='/add' element={ <AddVacation /> } />}                
                <Route path='/' element={isLoggedIn ? <VacationList /> : <Navigate to="/login"/>} /> 
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </main>
    );
}

export default Routing;
