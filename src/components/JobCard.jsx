export default function JobCard({ job }) {
    
    return (
    <>
    <h2>{job.title}</h2>
    <p>Salary: {job.pay}</p> 
    {job.level ? (<p>Experience: {job.level}</p>) : (<p>Experience: Not specified</p>)}
    <button>Apply</button>
    <button>Bookmark</button>
    <hr/>
    </>
    )
}