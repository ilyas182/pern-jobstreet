import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployerLogin({setAuth, EmployerAuth}){


    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const {email, password} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {email, password};
            const response = await fetch("http://localhost:3001/api/employer/login", { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

            const parseResponse = await response.json();
            localStorage.setItem("token", parseResponse.token);
            EmployerAuth(true);
            setAuth(false);
            navigate(`/employer/dashboard/${parseResponse.employer.businessname}`,
            { state: { employer: parseResponse.employer } }
            );
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
    <>
    
    <form onSubmit={submitForm}>
                <input 
                    type='email' 
                    placeholder='Email Login ID' 
                    name="email" 
                    className="form-control my-3"
                    value = {email}
                    onChange={e => onChange(e)}/>
                <input 
                    type='password' 
                    placeholder='Password' 
                    name="password" 
                    className="form-control my-3"
                    value = {password}
                    onChange={e => onChange(e)}/>
                
                <button className="btn btn-success btn-block">Login</button>
            </form>
    </>
    )
}