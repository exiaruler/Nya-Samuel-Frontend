import React, { useState } from 'react';
import {
    Link,
    Outlet,
  } from "react-router-dom";
import Navigation from './navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/samuel logo.png';
export default function NavBar(){
    const [login,setLogin]=useState(false);
    // dev routes
    const [dev,setDev]=useState(false);
    var navigation = new Navigation();
    const routes=navigation.routes.filter((route)=>route.show==true);
    const home=routes[0];
    return (
        <div>
    <nav>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="light">
      <Container>
        <Navbar.Brand ><Link to={home.url}><img src={logo} alt="Samuel" width={150} height={40}></img></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
                routes.map(route=>(
                    <Nav.Link><Link to={route.url}>{route.name}</Link></Nav.Link>
                ))
            }
          </Nav>
          
          <Nav id="ExternalLinksBar">
          {
            navigation.externalLinks.map(links=>(
              <Nav.Link href={links.url}><img src={links.image} alt={links.alt} width={links.width} height={links.height}/></Nav.Link>
            ))
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </nav>
    <Outlet />
        </div>
    )
}