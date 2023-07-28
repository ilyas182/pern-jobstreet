import { Fragment, useEffect, useState } from "react";
import { json } from "react-router-dom";
import AppliedJobs from "./AppliedJobs";

export default function Dashboard({setAuth}) {

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [applied, setApplied] = useState([]);

    async function getName() {
        try {
            const response = await fetch('/api/dashboard',{
                method: "GET",
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json();
            setName(parseRes.name)
            setId(parseRes.id);
        } catch (error) {
            console.error(error.message)
        }
    }

    async function getJobId(){
        const body = { user_id: id}
        try {
            const response = await fetch("/api/main/applied",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setApplied(jsonData);

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        getName();
        getJobId();
        
    }, [id]);
    
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
    return (
        <Fragment>
            <h1>Welcome, {name}</h1>
            <h3>Applications: </h3>
            {/* {JSON.stringify(applied)} */}
            {applied.length ? (applied.map((job, i) => <AppliedJobs job_id={job.job_id} i={i}/>)): (<>No applications sent</>)}
            
        </Fragment>
    )
}