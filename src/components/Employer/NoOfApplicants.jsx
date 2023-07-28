import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NoOfApplicants({job, employer}){
    const [applicants, setApplicants] = useState();
    async function getApplicants(){
        const response = await fetch(`/api/job/${job.id}/applied`);
        const jsonData = await response.json();
        setApplicants(jsonData)
    }
    useEffect(() => {
        getApplicants();
        console.log('applicants', applicants)
    }, [])
    return (
    <>
    
    Number of applicants: {applicants && applicants.length > 0 ? (<Link to={`/employer/dashboard/${employer.businessname}/jobs/${job.id}/applicants`} > {applicants.length}</Link>):(
      <>Nil</>)}
    </>
    )
}