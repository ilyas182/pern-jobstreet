import { Link, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button, NavLink } from 'react-bootstrap';

export default function NavBar({isAuth, setAuth}){
  const navigate = useNavigate()
  
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    navigate('/')
  }
    
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand>Your Career Future</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              {isAuth && (<Nav.Link><Link to="/dashboard">Dashboard</Link></Nav.Link>)}
              {!isAuth ? (<Button variant="outline-success" onClick={() => navigate('/login')}>Login</Button>) : (<Button variant="outline-success" onClick={(e) => logout(e)}>Logout</Button>)}
              <Button variant="outline-success" onClick={() => navigate('/employer/main')}>For Employers</Button>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}