import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import * as mdb from 'mdb-ui-kit';
import "mdb-ui-kit/css/mdb.min.css"; 
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";

export default function JobCard({ job }) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [bookmarkedData, setBookmarkedData] = useState([]);
    const [bookmark, setBookmark] = useState(null);
    const [employer, setEmployer] = useState();
    
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
    async function getEmployer() {
        const response = await fetch(`/api/employer/${job.employer_id}`);
        const jsonData = await response.json();
        setEmployer(jsonData);
    }

    async function checkIfBookmarked(){
        const body = { user_id: userId}
        // console.log(body)
        try {
            const response = await fetch("/api/job/bookmarked",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const jsonData = await response.json();
            setBookmarkedData(jsonData);
            // setBookmark(bookmarkedData.some((job) => job.job_id == job.id));   
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        getId();
        checkIfBookmarked();
        getEmployer();
    }, [userId]);
    
    useEffect(() => {
        // checkIfBookmarked();
        console.log("bookmarkedData",bookmarkedData)
        bookmarkedData.map((job, i) => console.log(i, job.job_id))
        if (bookmarkedData.some(bookmark => bookmark.job_id == job.id)) {
            setBookmark(true)
        }
        console.log('bookmark', bookmark)
    }, [bookmarkedData]);
   
    async function handleBookmark(){
        try {
            // userId = await getId();
            if (!userId){
                navigate('/login');
            }
            const body = {user_id : userId, job_id: job.id};
            // console.log(body)
            const response = await fetch("/api/main/save", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            if (response.ok){
                const jsonData = await response.json();
                // console.log(jsonData.message);
                setBookmark(!bookmark);
            }
            
        } catch (error) {
            console.error(error.message)
        }   
    }
    async function handleUnbookmark(){
        try {
            // userId = await getId();
            const body = {user_id : userId, job_id: job.id};
            // console.log(body)
            const response = await fetch("/api/job/unbookmark", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            if (response.ok){
                const jsonData = await response.json();
                // console.log(jsonData);
                setBookmark(!bookmark);
            }
            
        } catch (error) {
            console.error(error.message)
        }   
    }
    return (
    <>
    <div className="d-flex justify-content-center my-1">
    <Card style={{ width: '40rem' }} className="border border-primary">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Company: {employer?.businessname}</Card.Subtitle>
        <Card.Text>Description: {job.description}</Card.Text>
        <Card.Text><FaRegMoneyBillAlt/> Salary: {job.pay}</Card.Text>
        <Card.Text><CiLocationOn/>Location: {job.location}</Card.Text>
        {job.level ? (<p><LuNetwork/> Experience: {job.level}</p>) : (<p><LuNetwork/> Experience: Not specified</p>)}
        <div className="text-center">
        <Button onClick={() => navigate(`/job/${job.id}/apply`)} variant="success">Apply</Button>
        {!bookmark && <Button variant="warning" onClick={handleBookmark}><BsBookmarks/> Bookmark</Button>}
        {bookmark && <Button variant="warning" onClick={handleUnbookmark}><BsBookmarksFill/> Unbookmark</Button>}
        </div>
      </Card.Body>
    </Card>
    </div>
    
    </>
    )
}