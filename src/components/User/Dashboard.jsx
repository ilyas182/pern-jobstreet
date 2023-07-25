import { Fragment, useEffect, useState } from "react";

export default function Dashboard({setAuth}) {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard',{
                method: "GET",
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json();
            setName(parseRes.name)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        getName();
    }, []);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
    return (
        <Fragment>
            Dashboard, {name}
            <button onClick={(e) => logout(e)}>Logout</button>
        </Fragment>
    )
}