import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmployerJobDetails from "../../components/Employer/EmployerJobDetails";
import NoOfApplicants from "../../components/Employer/NoOfApplicants";

export default function EmployerJobPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const {employer} = location.state;
    // console.log(employer)
    const [employerJobs, setEmployerJobs] = useState();
    
    useEffect(() => {
        async function fetchEmployerJobs() {
            const response = await fetch(`/api/employer/${employer.id}/jobs`);
            const jsonData = await response.json();
            setEmployerJobs(jsonData);
            
          }
        fetchEmployerJobs()
        console.log("jobs", employerJobs);
      }, []);
    
    return(
    <>
    <button onClick={() => navigate(-1)}>Back</button>
    <hr/>
    {employerJobs && employerJobs.map((job, i) => (
        <div>
         {i+1}.<Link to={`/employer/dashboard/${employer.businessname}/jobs/${job.id}`} state={{job: job}}>{job.title}</Link>
         <br/>
         <NoOfApplicants employer={employer} job={job}/>
         <hr/>
        </div>
      ))}
    </>
    )
}