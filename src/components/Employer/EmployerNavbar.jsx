import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export default function EmployerNavbar({employer}){
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">Welcome, {`${employer.businessname}`}</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={`/employer/dashboard/${employer.businessname}/jobs`} state={{employer: employer}}>Jobs</Link></Nav.Link>
              <Nav.Link>Profile</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}