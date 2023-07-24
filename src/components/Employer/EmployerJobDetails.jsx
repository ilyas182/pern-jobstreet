import { Link, useLocation } from "react-router-dom";

export default function EmployerJobDetails(){
    const location = useLocation();
    const { job } = location.state;
    return(
    <>
        <h1>{job?.title}</h1>
        <p>Description: {job?.description}</p>
        <p>Industry: {job?.industry}</p>
        <p>Pay: {job?.pay}</p>

    </>)
}