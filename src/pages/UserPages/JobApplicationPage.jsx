import { useState } from "react";

export default function JobApplicationPage() {
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

            const body = {experience, expectedPay, email, contact};
            const response = await fetch(`http://localhost:3001/api/main/apply`, { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)   
        })
        if (response.ok) {
            setUpdateStatus("applied!");
          } else {
            setUpdateStatus("error");
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