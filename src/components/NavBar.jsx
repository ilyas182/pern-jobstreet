import { Link, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export default function NavBar(){
    const navigate = useNavigate()
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">Your Career Future</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">My profile</Nav.Link>
              <Button variant="outline-success" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="outline-success" onClick={() => navigate('/employer/main')}>For Employers</Button>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}