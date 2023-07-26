import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export default function EmployerNavbar({setEmployerMode, EmployerAuth, employerAuth}){
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    EmployerAuth(false);
    navigate('/employer/main')
  }

  const handleCandidate = () => {
    setEmployerMode(false);
    navigate('/')
  }
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
          <Navbar.Brand>Your Career Future</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>Profile</Nav.Link>
              {!employerAuth ? (<Button variant="outline-success" onClick={()=>navigate('/employer/login')}>Employer Login</Button>) : (<Button variant="outline-success" onClick={(e) => logout(e)}>Logout</Button>)}
              <Button variant="outline-success" onClick={handleCandidate}>For Candidates</Button>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}