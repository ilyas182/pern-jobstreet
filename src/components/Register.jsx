import { Fragment, useState } from "react";

export default function Register() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };

    return (
        <Fragment>
            <h1 className="text-center">Register</h1>
            <form>
                <input 
                    type='email' 
                    name='email' 
                    placeholder="email" 
                    className="form-control my-3"
                    value = {email}
                    onChange={e => onChange(e)}/>
                <input 
                    type='password' 
                    name='password' 
                    placeholder="password" 
                    className="form-control my-3"
                    value = {password}
                    onChange={e => onChange(e)}/>
                <input 
                    type='text' 
                    name='name' 
                    placeholder="name" 
                    className="form-control my-3"
                    value = {name}
                    onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    )
}