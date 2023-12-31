import { Fragment, useState } from "react";

export default function Register({setAuth}) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {email, password, name};
            const response = await fetch("/api/main/register", { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

            const parseResponse = await response.json();
            if (response.ok) {
            localStorage.setItem("token", parseResponse.token);
            setAuth(true);
            } else alert(parseResponse.error);

        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center">Register</h1>
            <form onSubmit={submitForm}>
                <input 
                    type='email' 
                    placeholder='email' 
                    name="email" 
                    className="form-control my-3"
                    value = {email}
                    onChange={e => onChange(e)}/>
                <input 
                    type='password' 
                    placeholder='password' 
                    name="password" 
                    className="form-control my-3"
                    value = {password}
                    onChange={e => onChange(e)}/>
                <input 
                    type='text' 
                    placeholder='name' 
                    name="name" 
                    className="form-control my-3"
                    value = {name}
                    onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    )
}