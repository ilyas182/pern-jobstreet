import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export default function EmployerNavbar({employer, setEmployerMode}){
  const navigate = useNavigate();

  const handleCandidate = () => {
    setEmployerMode(false);
    navigate('/')
  }
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
          <Navbar.Brand>Your Career Future</Navbar.Brand>
            {/* <Navbar.Brand>Welcome, {`${employer.businessname}`}</Navbar.Brand> */}
            <Nav className="me-auto">
              {/* <Nav.Link>
                <Link to={`/employer/dashboard/${employer.businessname}/jobs`} state={{employer: employer}}>Jobs Posted</Link></Nav.Link> */}
              <Nav.Link>Profile</Nav.Link>
              <Button variant="outline-success" onClick={()=>navigate('/employer/login')}>Employer Login</Button>
              <Button variant="outline-success" onClick={handleCandidate}>For Candidates</Button>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}