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
        <br/>
        <div className="d-flex flex-column">
        <div className="d-flex justify-content-center lead">We have {jobs.length} jobs available
        {!loading &&  <Spinner animation="border" variant="primary" />}
        </div>
        {jobs.map((job) => <JobCard job={job} />)}
        </div>
    </Fragment>
    )
}