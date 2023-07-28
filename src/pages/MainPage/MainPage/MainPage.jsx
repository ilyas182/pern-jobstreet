import { Fragment, useEffect, useState } from "react";
import SearchBar from "../../../components/User/SearchBar";
import JobCard from "../../../components/JobCard";
import Spinner from 'react-bootstrap/Spinner'


export default function MainPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    async function fetchAllJobs() {
        const response = await fetch(`/api/job/all`);
        const jsonData = await response.json();
        setJobs(jsonData);
        setLoading(true);
      }
    
      useEffect(() => {
        fetchAllJobs();
      }, []);
    //   console.log("jobs", jobs);
    return (
    <Fragment>
        <SearchBar/>
        <hr></hr>
        {!loading &&  <Spinner animation="border" variant="primary" />}
        {jobs.map((job) => <JobCard job={job} />)}
        
    </Fragment>
    )
}