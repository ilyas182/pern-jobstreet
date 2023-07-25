import { useNavigate } from "react-router-dom"

export default function JobCard({ job }) {
    const navigate = useNavigate();
    
    return (
    <>
    <h2>{job.title}</h2>
    <p>Salary: {job.pay}</p> 
    {job.level ? (<p>Experience: {job.level}</p>) : (<p>Experience: Not specified</p>)}
    <button onClick={() => navigate(`/job/${job.id}/apply`)}>Apply</button>
    <button>Bookmark</button>
    <hr/>
    </>
    )
}