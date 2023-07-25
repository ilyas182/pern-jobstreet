import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function JobCard({ job }) {
    const navigate = useNavigate();
    let userId;
    let bookmarkedData;
    const [bookmark, setBookmark] = useState(null);
    
    async function getId() {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard',{
                method: "GET",
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json();
            // userId = parseRes.id;
            return parseRes.id
        } catch (error) {
            console.error(error.message)
        }
    }
    
    async function checkIfBookmarked(){
        userId = await getId();
        const body = { user_id: userId}
        console.log(body)
        try {
            const response = await fetch("http://localhost:3001/api/job/bookmarked",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const jsonData = await response.json();
            bookmarkedData = jsonData;   
        } catch (error) {
            console.error(error.message)
        }
        if (bookmarkedData[0]?.job_id == job.id) {
            setBookmark(true);
        }
    }

    useEffect(()=>{
        // getId();
        checkIfBookmarked();
    }, []);

    async function handleBookmark(){
        try {
            userId = await getId();
            const body = {user_id : userId, job_id: job.id};
            console.log(body)
            const response = await fetch("http://localhost:3001/api/main/save", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            if (response.ok){
                const jsonData = await response.json();
                console.log(jsonData.message);
                setBookmark(!bookmark);
            }
            
        } catch (error) {
            console.error(error.message)
        }   
    }
    async function handleUnbookmark(){
        try {
            userId = await getId();
            const body = {user_id : userId, job_id: job.id};
            console.log(body)
            const response = await fetch("http://localhost:3001/api/job/unbookmark", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            if (response.ok){
                const jsonData = await response.json();
                console.log(jsonData);
                setBookmark(!bookmark);
            }
            
        } catch (error) {
            console.error(error.message)
        }   
    }
    return (
    <>
    <h2>{job.title}</h2>
    <p>Salary: {job.pay}</p> 
    {job.level ? (<p>Experience: {job.level}</p>) : (<p>Experience: Not specified</p>)}
    <button onClick={() => navigate(`/job/${job.id}/apply`)}>Apply</button>
    {!bookmark && <button onClick={handleBookmark}>Bookmark</button>}
    {bookmark && <button onClick={handleUnbookmark}>Unbookmark</button>}
    
    <hr/>
    </>
    )
}