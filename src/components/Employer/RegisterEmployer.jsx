import { useState } from "react";

export default function RegisterEmployer({setAuth, EmployerAuth}){

    const [inputs, setInputs] = useState({
        email: "",
        contact_name: "",
        contact: "",
        businessName: "",
        password: "",
    });

    const {email, contact_name, contact, businessName, password} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {email, contact_name, contact, businessName, password};
            const response = await fetch("http://localhost:3001/api/employer/register", { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

            const parseResponse = await response.json();
            localStorage.setItem("token", parseResponse.token);
            EmployerAuth(true);
            setAuth(false);
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
    <>
    <h1>Employer Registration</h1>
    <form onSubmit={submitForm}>
                <input 
                    type='email' 
                    placeholder='Email Login ID' 
                    name="email" 
                    className="form-control my-3"
                    value = {email}
                    onChange={e => onChange(e)}/>
                <input 
                    type='text' 
                    placeholder='Contact Person Name' 
                    name="contact_name" 
                    className="form-control my-3"
                    value = {contact_name}
                    onChange={e => onChange(e)}/>
                <input 
                    type='text' 
                    placeholder='Mobile Phone Number' 
                    name="contact" 
                    className="form-control my-3"
                    value = {contact}
                    onChange={e => onChange(e)}/>
                <input 
                    type='text' 
                    placeholder='Registered Business Name' 
                    name="businessName" 
                    className="form-control my-3"
                    value = {businessName}
                    onChange={e => onChange(e)}/>
                <input 
                    type='password' 
                    placeholder='Password' 
                    name="password" 
                    className="form-control my-3"
                    value = {password}
                    onChange={e => onChange(e)}/>
                
                <button className="btn btn-success btn-block">Register</button>
            </form>
    </>
    )
}