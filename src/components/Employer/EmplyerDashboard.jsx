import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployerDashboard({setAuth, EmployerAuth}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth(false);
        EmployerAuth(false);
        navigate('/employer/main');
    }
    return (
        <Fragment>
            Dashboard
            <button onClick={handleLogout}>Logout</button>
        </Fragment>
    )
}