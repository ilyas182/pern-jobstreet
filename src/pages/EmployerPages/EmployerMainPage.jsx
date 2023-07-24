import { Link } from "react-router-dom";
import RegisterEmployer from "../../components/Employer/RegisterEmployer";

export default function EmployerMainPage(props){
    return (
    <>
    <Link to="/employer/login">Login</Link>
    <RegisterEmployer props={props}/>
    </>
    )
}