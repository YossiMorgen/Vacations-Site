import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext/AuthContext";
import "./Header.css"
import useAuth from "../../../Services/useAuth";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    const {auth, setAuth} = useContext(AuthContext);
    const {logout} = useAuth();
    return (
        <header className="Header">
            <Link to="./vacations">
                <h1>Vacation Site</h1>
            </Link>
            {auth.token !== '' && 
                <>
                    {/* <div>welcome {auth.user?.userName}</div>  */}
                    <div className="header_buttons">
                        <button onClick={logout}>Log Out</button>
                        {auth.user?.role === "admin" && <NavLink to="add">Add Vacation</NavLink>}                        
                    </div>
                </>
            }
            
        </header>
    )

}