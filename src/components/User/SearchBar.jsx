import { useRef } from "react";
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
    const navigate = useNavigate();
    const inputRef = useRef();
        
    return(
    <>
    <form>
        <div>
            <input
            type="search"
            id="mySearch"
            name="q"
            ref = {inputRef}
            placeholder="Search for job title"
            size="30" />
            <button onClick={()=>navigate('/search', {state: {query: inputRef.current.value}})}>Search</button>
        </div>
    </form>
    </>
    )
}