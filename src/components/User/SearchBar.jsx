import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import "mdb-ui-kit/css/mdb.min.css"; 


export default function SearchBar() {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [show, setShow] = useState(false)
    
    const handleSearch = () => {
        const inputValue = inputRef.current.value.trim(); // Remove leading and trailing spaces
        if (inputValue !== "") {
          navigate('/search', { state: { query: inputValue } });
        } else {
          // Show an error message or perform any action for empty input
          alert("Please enter a search query!");
        }
      };
    return(
    <>
    <div id="intro" className="bg-image shadow-1-strong" style={{height: '200px'}}>
    <video style={{ minWidth: '100%', minHeight: '100%' }} playsInline autoPlay muted loop>
                    <source className="h-100" src="https://mdbootstrap.com/img/video/animation-intro-min.mp4" type="video/mp4" />
                </video>
             <div className="mask" style={{ background: "linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)"}}>
    <Container className="d-flex flex-column justify-content-center bd-highlight mb-3 h-100" >
    
      <div className="p-2 bd-highlight justify-content-center text-center h3">Match your skills. <span className="text-muted">Find more jobs!</span></div>
      
    <form>
        <div className="p-2 bd-highlight justify-content-center text-center">
            
            <input
            type="search"
            id="mySearch"
            name="q"
            ref = {inputRef}
            placeholder="Search for job title"
            size="30" />
            <button type="button" class="btn btn-primary btn-sm m-1" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg> Search</button>
        </div>
    </form>
    
    </Container>
    </div>
    </div>
    </>
    )
}