import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function JobApplicationPage() {
    let userId, applicantData;
    const navigate = useNavigate();
    const {jobId} = useParams(); 
    
    async function getId() {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard',{
                method: "GET",
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json();
            userId = parseRes.id;
        } catch (error) {
            console.error(error.message)
        }
    }
    async function checkIfApplied(){
        try {
            const response = await fetch(`http://localhost:3001/api/job/${jobId}/applied`)
            const jsonData = await response.json();
            applicantData = jsonData;   
        } catch (error) {
            console.error(error.message)
        }
        if (applicantData[0].job_id == jobId) {
            setUpdateStatus("success");
        }
    }
    
    useEffect(()=>{
        getId();
        checkIfApplied();
    }, []);

    const [inputs, setInputs] = useState({
        experience: "",
        expectedPay: "",
        email: "",
        contact: ""});
    const [updateStatus, setUpdateStatus] = useState(null);
    
    
    const {experience, expectedPay, email, contact} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };
  
    const submitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {experience, expectedPay, email, contact, job_id: jobId, user_id: userId};
            const response = await fetch(`http://localhost:3001/api/main/apply`, { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)   
        })
        if (response.ok) {
            const responseData = await response.json();
            setUpdateStatus("success");
          } else {
            setUpdateStatus("error");
            const responseData = await response.json();
            console.log(responseData)
        
          }
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
    <>
    <button onClick={() => navigate(-1)}>Back</button>
     <form onSubmit={submitForm}>
                <label>Past experiences: </label>
                <input 
                    type='text'  
                    name="experience" 
                    className="form-control my-3"
                    value = {experience}
                    onChange={e => onChange(e)}/>
                <label>Expected Pay: </label>
                <input 
                    type='text' 
                    name="expectedPay" 
                    className="form-control my-3"
                    value = {expectedPay}
                    onChange={e => onChange(e)}/>
                <label>Email: </label>
                <input 
                    type='text'  
                    name="email" 
                    className="form-control my-3"
                    value = {email}
                    onChange={e => onChange(e)}/>
                <label>Contact: </label>
                <input 
                    type='text'  
                    name="contact" 
                    className="form-control my-3"
                    value = {contact}
                    onChange={e => onChange(e)}/>
                {updateStatus !== "success" && (<button className="btn btn-success btn-block">Apply</button>)}
                {updateStatus == "success" && (
                <button className="btn btn-success btn-block" disabled="true">
                    Applied!
                </button>)}
            </form>
            {updateStatus === "success" && <p>Application successful</p>}
            {updateStatus === "error" && <p>Application failed. Please try again.</p>}
    </>)
}