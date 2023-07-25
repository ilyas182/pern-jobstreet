import { useNavigate } from "react-router-dom"

export default function PleaseLoginPage() {
    const navigate = useNavigate();
    return(
        <>
        Please login or sign up to apply.
        <button onClick={()=> navigate('/login')}>Login</button>
        </>
    )
}