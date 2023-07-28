import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function AppliedJobs({job_id, i}){
    const [job, setJob] = useState("");
    async function getJob(){
        const response = await fetch(`/api/job/${job_id}`)
        const jsonData = await response.json();
        setJob(jsonData);
    }
    useEffect(()=> {
        getJob();
        console.log('job',job)
    },[])
    return (
    <>
    {/* {JSON.stringify(job_id)} */}
    <Card style={{ width: '24rem' }} className="text-center">
      <Card.Body>
        <Card.Title>{i+1}. {job[0]?.title}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Company: {employer?.businessname}</Card.Subtitle> */}
        <Card.Text>Description: {job[0]?.description}</Card.Text>
        <Card.Text>Salary: {job[0]?.pay}</Card.Text>
        <Card.Text>Location: {job[0]?.location}</Card.Text>
        {job.level ? (<p>Experience: {job[0]?.level}</p>) : (<p>Experience: Not specified</p>)}
      </Card.Body>
    </Card>
    </>
    )
}