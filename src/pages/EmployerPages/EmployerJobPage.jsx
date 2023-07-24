import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

export default function EmployerJobPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const {employer} = location.state;
    // console.log(employer)
    const [employerJobs, setEmployerJobs] = useState();
    
    useEffect(() => {
        async function fetchEmployerJobs() {
            const response = await fetch(`http://localhost:3001/api/employer/${employer.id}/jobs`);
            const jsonData = await response.json();
            setEmployerJobs(jsonData);
            
          }
        fetchEmployerJobs()
        console.log("jobs", employerJobs);
      }, []);
    
    return(
    <>
    <button onClick={() => navigate(-1)}>Back</button>
    <p>{employerJobs[0]?.title}</p>
    </>
    )
}