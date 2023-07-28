import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmployerNavbar from "./EmployerNavbar";
import EmployerJobPage from "../../pages/EmployerPages/EmployerJobPage";

export default function EmployerDashboard({setAuth, EmployerAuth}) {
    const location = useLocation();
    const employer = location?.state?.employer;   
    const navigate = useNavigate();
    EmployerAuth(true);
    return (
        <Fragment>
            <h1>Weclome, {employer?.businessname}</h1>
            <hr/>
            <Link to={`/employer/dashboard/${employer?.businessname}/jobs`} state={{employer: employer}}>Posted Jobs</Link>
            {/* <EmployerJobPage employer={employer}/> */}
        </Fragment>
    )
}