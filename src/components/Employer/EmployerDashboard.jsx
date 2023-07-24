import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmployerNavbar from "./EmployerNavbar";

export default function EmployerDashboard({setAuth, EmployerAuth}) {
    const location = useLocation();
    const employer = location?.state?.employer;   
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth(false);
        EmployerAuth(false);
        navigate('/employer/main');
    }
    return (
        <Fragment>
            <EmployerNavbar employer={employer}/>
            <button onClick={handleLogout}>Logout</button>
        </Fragment>
    )
}