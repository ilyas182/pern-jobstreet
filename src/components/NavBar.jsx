import { Link, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button, NavLink } from 'react-bootstrap';
import { BiLogIn,BiLogOut } from "react-icons/bi";
import { MdWorkOutline } from "react-icons/md";

export default function NavBar({isAuth, setAuth, setEmployerMode}){
  const navigate = useNavigate()
  
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    navigate('/')
  }

  const handleEmployer = () => {
    setEmployerMode(true);
    navigate('/employer/main')
  }
    
    return (
        <>  
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand>Your Career Future</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link><Link to="/">Home</Link></Nav.Link>       
              {isAuth && (<Nav.Link><Link to="/dashboard">Dashboard</Link></Nav.Link>)}
              {isAuth && (<Nav.Link><Link to="/bookmarks">Bookmarks</Link></Nav.Link>)}
              {!isAuth ? (<Button variant="outline-success" onClick={() => navigate('/login')}><BiLogIn/> Login</Button>) : (<Button variant="outline-danger" onClick={(e) => logout(e)}><BiLogOut/> Logout</Button>)}
            </Nav>
            <Nav pullRight>
              <Button variant="primary" onClick={handleEmployer}>For Employers <MdWorkOutline/></Button>
            </Nav>
          </Container>
        </Navbar>
      </>
      );
}