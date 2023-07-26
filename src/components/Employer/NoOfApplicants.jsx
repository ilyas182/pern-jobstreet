import { useEffect, useState } from "react";

export default function NoOfApplicants({job}){
    const [applicants, setApplicants] = useState();
    async function getApplicants(){
        const response = await fetch(`http://localhost:3001/api/job/${job.id}/applied`);
        const jsonData = await response.json();
        setApplicants(jsonData)
    }
    useEffect(() => {
        getApplicants();
        console.log('applicants', applicants)
    }, [])
    return (
    <>
    Number of applicants: {applicants.length}
    </>
    )
}