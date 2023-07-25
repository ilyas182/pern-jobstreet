import { Link, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Button, NavLink } from 'react-bootstrap';

export default function NavBar(){
    const navigate = useNavigate()
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand>Your Career Future</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              <Nav.Link href="#features">My profile</Nav.Link>
              <Button variant="outline-success" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="outline-success" onClick={() => navigate('/employer/main')}>For Employers</Button>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}