import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"

export default function ViewApplicants(){
    const {jobId} = useParams();
    const [applicants, setApplicants] = useState();
    
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

    </>
    )
}