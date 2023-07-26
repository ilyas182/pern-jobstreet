import { Link } from "react-router-dom";
import RegisterEmployer from "../../components/Employer/RegisterEmployer";

export default function EmployerMainPage(props){
    return (
    <>
    <RegisterEmployer props={props}/>
    </>
    )
}