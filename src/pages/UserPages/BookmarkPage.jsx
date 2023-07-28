import { useEffect, useState } from "react";
import Bookmarks from "../../components/User/Bookmark";
import Spinner from 'react-bootstrap/Spinner'

export default function BookmarkPage(){
    const [userId, setUserId] = useState("");
    const [bookmarked, setBookmarked] = useState([])
    const [loading, setLoading] = useState(false);
    async function getId() {
        try {
            const response = await fetch('/api/dashboard',{
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
            const response = await fetch("/api/job/bookmarked",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const jsonData = await response.json();
            setBookmarked(jsonData);
            setLoading(true);
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(()=>{
        getId();
        // checkIfBookmarked();
    }, []);
    useEffect(()=>{
        checkIfBookmarked();
        console.log(bookmarked)
    }, [userId]);
    return(
    <>
    {!loading &&  <Spinner animation="border" variant="primary" />}
    {bookmarked && bookmarked.length > 0 ? bookmarked.map((job, i) => <Bookmarks job_id={job.job_id} i={i} /> ) : (<>No bookmarked jobs</>)}
    
    </>
    )
}