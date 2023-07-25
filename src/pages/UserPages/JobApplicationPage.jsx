import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function JobApplicationPage() {
    const [user_id, setUser_id] = useState();
    async function getUserId() {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard',{
                method: "GET",
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json();
            setUser_id(parseRes.id)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
     getUserId();
    }, []);
    const [inputs, setInputs] = useState({
        experience: "",
        expectedPay: "",
        email: "",
        contact: ""});
    const [updateStatus, setUpdateStatus] = useState(null);
    const {jobId} = useParams(); 
    
    const {experience, expectedPay, email, contact} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };
  
    const submitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {experience, expectedPay, email, contact, job_id: jobId, user_id};
            const response = await fetch(`http://localhost:3001/api/main/apply`, { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)   
        })
        if (response.ok) {
            const responseData = await response.json();
                const user_id = responseData.user_id;

                // Now you have access to the user_id on the frontend
                console.log("User ID:", user_id);
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
                <button className="btn btn-success btn-block">Apply</button>
            </form>
            {updateStatus === "success" && <p>Applied!</p>}
            {updateStatus === "error" && <p>Update failed. Please try again.</p>}
    </>)
}