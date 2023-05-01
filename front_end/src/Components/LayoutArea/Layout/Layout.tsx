import AuthProvider from "../../../Context/AuthContext/AuthProvider";
import VacationsProvider from "../../../Context/VacationContext/VacationProvider";
import Header from "../../HeaderArea/Header/Header";
import Routing from "../../RoutingArea/Routing/Routing";

export default function Layout(){
    return (
        <div className="Layout">
            
        <AuthProvider>
            <Header />
            <VacationsProvider>
            <Routing />  
            </VacationsProvider>
        </AuthProvider>
        </div>
    )
}