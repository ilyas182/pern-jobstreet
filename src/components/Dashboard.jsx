import { Fragment } from "react";

export default function Dashboard({setAuth}) {
    return (
        <Fragment>
            Dashboard
            <button onClick={() => setAuth(false)}>Logout</button>
        </Fragment>
    )
}