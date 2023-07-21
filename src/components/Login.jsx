import { Fragment } from "react";

export default function Login({setAuth}) {
    return (
    <Fragment>
        <h1>Login</h1>
        <button onClick={() => setAuth(true)}>Login</button>
    </Fragment>
        
)}