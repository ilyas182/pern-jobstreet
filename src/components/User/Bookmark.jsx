import { useEffect, useState } from "react";
import JobCard from "../JobCard";

export default function Bookmarks({job_id}){
    const [job, setJob] = useState([]);
    async function getJob(){
        const response = await fetch(`http://localhost:3001/api/job/${job_id}`)
        const jsonData = await response.json();
        setJob(jsonData);
    }
    useEffect(()=> {
        getJob();
        console.log('job',job)
    },[])
    return (
    <>
    {job.length && job.map((job) => <JobCard job={job}/>)}
    </>
    )
}