import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom"
import JobCard from "../../components/JobCard";

export default function SearchResultsPage(){
    const location = useLocation();
    let query = location?.state?.query;
    // console.log('query', query)
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [jobs, setJobs] = useState([]);
    
    

    async function searchResult(){
        const response = await fetch(`http://localhost:3001/api/job/search?q=${query}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });
        const jsonData = await response.json();
        setJobs(jsonData);
    }
    useEffect(() => {
        if (query) {
          const search = { q: query };
          setSearchParams(search, { replace: true });
        //   
          
        } else {
            query = searchParams.get('q')
        }
        searchResult();
      }, [query, searchParams]);
    
      // useEffect to log the updated jobs state
    //   useEffect(() => {
    //     console.log(jobs);
    //     console.log('q',searchParams.get('q'))
    //   }, [jobs]);

    return(
    <>
    <h1>Search Results</h1>
    
    {jobs && jobs.length > 0 ? (jobs.map((job) => <JobCard key={job.id} job={job} />)) : (jobs.Results)}
    </>
    )
}