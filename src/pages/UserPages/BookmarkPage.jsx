import { useEffect, useState } from "react";
import Bookmarks from "../../components/User/Bookmark";

export default function BookmarkPage(){
    const [userId, setUserId] = useState("");
    const [bookmarked, setBookmarked] = useState([])
    async function getId() {
        try {
            const response = await fetch('http://localhost:3001/api/dashboard',{
                method: "GET",
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json();
            setUserId(parseRes.id);
            
        } catch (error) {
            console.error(error.message)
        }
    }
    async function checkIfBookmarked(){
        const body = { user_id: userId}
        try {
            const response = await fetch("http://localhost:3001/api/job/bookmarked",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const jsonData = await response.json();
            setBookmarked(jsonData);
            
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(()=>{
        getId();
        checkIfBookmarked();
        console.log('bookmark',bookmarked);   
    }, []);
    return(
    <>
    {bookmarked && bookmarked.map((job, i) => <Bookmarks job_id={job.job_id} i={i} /> )}
    </>
    )
}