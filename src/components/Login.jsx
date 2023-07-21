import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Login({setAuth}) {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const body = {email, password};
            const response = await fetch('http://localhost:3001/api/main/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
                const parseResponse = await response.json();
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    const {email, password} = inputs;
    return (
    <Fragment>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                name="email"
                placeholder="email"
                className="form-control my-3"
                value={email}
                onChange={(e)=>onChange(e)}
            />
            <input
                type="password"
                name="password"
                placeholder="password"
                className="form-control my-3"
                value={password}
                onChange={(e)=>onChange(e)}
            />
            <button className="btn btn-success btn-block" onSubmit={handleSubmit}>Submit</button>
            <p>Don't have an account? Click </p><Link to="/register">here</Link> <p>to register</p>
        </form>
    </Fragment>
        
)}