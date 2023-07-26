import { useEffect, useState } from "react";

export default function EmployerPostJob(){
    const [employer, setEmployer] = useState("");

    async function getEmployer() {
        try {
            const response = await fetch('http://localhost:3001/api/employer/authorize',{
                method: "GET",
                headers: { token: localStorage.token}
            })
        
            const parseRes = await response.json();
            console.log(parseRes)
            setEmployer(parseRes.businessname)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        getEmployer();
    }, []);
    return (
    <>{employer}</>
    )
}