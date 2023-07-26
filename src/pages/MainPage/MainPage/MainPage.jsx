import { Fragment, useEffect, useState } from "react";
import SearchBar from "../../../components/User/SearchBar";
import JobCard from "../../../components/JobCard";

export default function MainPage() {
    const [jobs, setJobs] = useState([]);
    async function fetchAllJobs() {
        const response = await fetch(`http://localhost:3001/api/job/all`);
        const jsonData = await response.json();
        setJobs(jsonData);
      }
    
      useEffect(() => {
        fetchAllJobs();
      }, []);
    //   console.log("jobs", jobs);
    return (
    <Fragment>
        <SearchBar/>
        {jobs.map((job) => <JobCard job={job} />)}
        
    </Fragment>
    )
}