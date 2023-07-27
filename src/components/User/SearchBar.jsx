import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

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
    <Container>
        <Row >
            <Col></Col>
            <Col>
    <form>
        <div>
            <input
            type="search"
            id="mySearch"
            name="q"
            ref = {inputRef}
            placeholder="Search for job title"
            size="30" />
            <button type="button" class="btn btn-primary btn-sm" onClick={handleSearch}>Search</button>
        </div>
    </form>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    </>
    )
}