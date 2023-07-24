import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EmployerJobDetails(){
    const location = useLocation();
    const navigate = useNavigate();
    const { job } = location.state;

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
  
    return(
    <>
        <h1>{job?.title}</h1>
        <p>Description: {job?.description}</p>
        <p>Industry: {job?.industry}</p>
        <p>Pay: {job?.pay}</p>
        <button onClick={() => handleDelete(job.id)}>Delete job</button>

    </>)
}