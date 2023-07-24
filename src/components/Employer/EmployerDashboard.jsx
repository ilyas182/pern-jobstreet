import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
            <>Welcome, {employer.businessname}</>
            <button onClick={handleLogout}>Logout</button>
        </Fragment>
    )
}