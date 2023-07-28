import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployerPostJob(){
    const [employer, setEmployer] = useState({});
    const [updateStatus, setUpdateStatus] = useState(null)
    const navigate = useNavigate();

    async function getEmployer() {
        try {
            const response = await fetch('/api/employer/authorize',{
                method: "GET",
                headers: { token: localStorage.token}
            })
        
            const parseRes = await response.json();
            // console.log(parseRes)
            setEmployer(parseRes)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        getEmployer();
    }, []);

    const [inputs, setInputs] = useState({title:"", description:"", pay:"", industry:"", location:"", level:""});

    const {title, description, pay, industry, location, level} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };
  
    const submitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {title, description, pay, industry, location, level, employer_id: employer.id};
            const response = await fetch(`/api/employer/postjob`, { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)   
        })
        if (response.ok) {
            setUpdateStatus("success");
          } else {
            setUpdateStatus("error");
          }
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
    <>
    <button onClick={() => navigate(-1)}>Back</button>
    <form onSubmit={submitForm}>
                <label>Title: </label>
                <input 
                    type='text'  
                    name="title" 
                    className="form-control my-3"
                    value = {title}
                    onChange={e => onChange(e)}/>
                <label>Description: </label>
                <textarea className="form-control my-3" type='text' name="description" rows="4" cols="50" value = {description}
                    onChange={e => onChange(e)}/>

                {/* <input 
                    type='text' 
                    name="description" 
                    className="form-control my-3"
                    value = {description}
                    onChange={e => onChange(e)}/> */}
                <label>Pay: </label>
                <input 
                    type='text'  
                    name="pay" 
                    className="form-control my-3"
                    value = {pay}
                    onChange={e => onChange(e)}/>
                <label>Industry: </label>
                <input 
                    type='text'  
                    name="industry" 
                    className="form-control my-3"
                    value = {industry}
                    onChange={e => onChange(e)}/>
                <label>Location: </label>
                <input 
                    type='text'  
                    name="location" 
                    className="form-control my-3"
                    value = {location}
                    onChange={e => onChange(e)}/>
                {/* <label>Closing Date: </label>
                <input 
                    type='text'  
                    name="location" 
                    className="form-control my-3"
                    value = {location}
                    onChange={e => onChange(e)}/> */}
                <label>Experience level: </label>
                <input 
                    type='text'  
                    name="level" 
                    className="form-control my-3"
                    value = {level}
                    onChange={e => onChange(e)}/>
                
                {updateStatus !== "success" && (<button className="btn btn-success btn-block">Post</button>)}
                {updateStatus == "success" && (
                <button className="btn btn-success btn-block" disabled="true">
                    Job posted!
                </button>)}
            </form>
            {updateStatus === "error" && <p>Job posting failed. Please try again.</p>}

    </>
    )
}