import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EmployerJobDetails(){
    const locate = useLocation();
    const navigate = useNavigate();
    const { job } = locate.state;

    const [updateStatus, setUpdateStatus] = useState(null);

    const handleDelete = async(id) => {
        try {
          const response = await fetch(`http://localhost:3001/api/employer/deleteJob/${id}`,{
            method: 'DELETE'
          });
          console.log(response);
        //   setTweets(tweets.filter(tweet => tweet.tweet_id !== id));
        //   console.log(tweets);
        navigate(-1);
        } catch (error) {
          console.error("Error deleting job:", error.message);
        }
      }

    const [inputs, setInputs] = useState({title: job?.title, description: job?.description, pay: job?.pay, industry: job?.industry, location:job?.location, level:job?.level});

    const {title, description, pay, industry, location, level} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]:e.target.value})
    };
  
    const submitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {title, description, pay, industry, location, level};
            const response = await fetch(`http://localhost:3001/api/employer/editJob/${job.id}`, { 
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)   
        })
        if (response.ok) {
            setUpdateStatus("success");
          } else {
            setUpdateStatus("error");
          }
        } catch (error) {
            console.error(error.message)
        }
    }
    return(
    <>  
        <button onClick={() => navigate(-1)}>Back</button>
        {/* <h1>{job?.title}</h1>
        <p>Description: {job?.description}</p>
        <p>Industry: {job?.industry}</p>
        <p>Pay: {job?.pay}</p> */}

        <form onSubmit={submitForm}>
                <label>Title: </label>
                <input 
                    type='text'  
                    name="title" 
                    className="form-control my-3"
                    value = {title}
                    onChange={e => onChange(e)}/>
                <label>Description: </label>
                <input 
                    type='text' 
                    name="description" 
                    className="form-control my-3"
                    value = {description}
                    onChange={e => onChange(e)}/>
                <label>Pay: </label>
                <input 
                    type='text'  
                    name="pay" 
                    className="form-control my-3"
                    value = {pay}
                    onChange={e => onChange(e)}/>
                <label>Industry: </label>
                <input 
                    type='text'  
                    name="industry" 
                    className="form-control my-3"
                    value = {industry}
                    onChange={e => onChange(e)}/>
                <label>Location: </label>
                <input 
                    type='text'  
                    name="location" 
                    className="form-control my-3"
                    value = {location}
                    onChange={e => onChange(e)}/>
                {/* <label>Closing Date: </label>
                <input 
                    type='text'  
                    name="location" 
                    className="form-control my-3"
                    value = {location}
                    onChange={e => onChange(e)}/> */}
                <label>Experience level: </label>
                <input 
                    type='text'  
                    name="level" 
                    className="form-control my-3"
                    value = {level}
                    onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Update</button>
            </form>
        
        <button onClick={() => handleDelete(job.id)}>Delete job</button>
        {updateStatus === "success" && <p>Update successful!</p>}
        {updateStatus === "error" && <p>Update failed. Please try again.</p>}

    </>)
}