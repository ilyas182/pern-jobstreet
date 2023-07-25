import { Fragment, useState } from "react";

export default function Dashboard({setAuth}) {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard')
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <Fragment>
            Dashboard
            
        </Fragment>
    )
}