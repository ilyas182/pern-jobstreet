import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function JobCard({ job }) {
    const navigate = useNavigate();
    let userId, bookmarkedData;
    const [bookmark, setBookmark] = useState(null);
    
    async function getId() {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard',{
                method: "GET",
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json();
            userId = parseRes.id;
        } catch (error) {
            console.error(error.message)
        }
    }
    async function checkIfApplied(){
        try {
            const response = await fetch(`http://localhost:3001/api/job/${job.id}/applied`)
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
        getId();
        checkIfApplied();
    }, []);
    return (
    <>
    <h2>{job.title}</h2>
    <p>Salary: {job.pay}</p> 
    {job.level ? (<p>Experience: {job.level}</p>) : (<p>Experience: Not specified</p>)}
    <button onClick={() => navigate(`/job/${job.id}/apply`)}>Apply</button>
    <button onClick={handleBookmark}>Bookmark</button>
    <hr/>
    </>
    )
}