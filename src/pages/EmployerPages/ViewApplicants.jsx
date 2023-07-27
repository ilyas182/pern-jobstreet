import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function ViewApplicants(){
    const {jobId} = useParams();
    const [applicants, setApplicants] = useState();
    const navigate = useNavigate();
    
    async function getApplicants(){
        const response = await fetch(`http://localhost:3001/api/job/${jobId}/applied`);
        const jsonData = await response.json();
        setApplicants(jsonData)
    }
    useEffect(() => {
        getApplicants();
        console.log('applicants', applicants)
    }, [])
    return (
    <>
    <h1>Applicants</h1>
    <button onClick={()=> navigate(-1)}>Back</button>
    {applicants && applicants.map((applicant, i) =>
    <div> 
    <h3>Applicant {i+1}</h3>
    <p>Experience: {applicant.experience}</p>
    <p>Expected salary: {applicant.expectedpay}</p>
    <p>Email: {applicant.email}</p>
    <p>Contact: {applicant.contact}</p>
    <hr/>
    </div>
    )}
    </>
    )
}