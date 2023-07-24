import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export default function NavBar(){
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href="#home">Your Career Future</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">My profile</Nav.Link>
              <Button variant="outline-success">Login</Button>
              <Button variant="outline-success">For Employers</Button>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}