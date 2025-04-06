import React, { useEffect, useState } from 'react';
import {
    Link,
    Outlet,
  } from "react-router-dom";
import Navigation from './Navigation/navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/samuel logo.png';
import Logout from './Logout';
import { getLoginState } from '../redux/slice/loginSlice';
import { useSelector,useDispatch} from 'react-redux';
export default function NavBar(props:any){
    const [login,setLogin]=useState(false);
    // dev routes
    var navigation = new Navigation();
    const routes=navigation.routes.filter((route)=>route.show===true);
    const home=routes[0];
    var loginState=useSelector(getLoginState);

    let loginProp=false;
    if(props.login){
      loginProp=props.login;
    }
    loginProp=loginState;
    // user links
    const formsUser=navigation.formLinks.filter((link)=>link.show===true);
    const protectedRoutes=navigation.protectedRoutes.filter((link)=>link.show===true);
    const checkLogin=()=>{
      if(loginProp===true){
        setLogin(true);
      }
    }
    useEffect(() => {
      checkLogin();
   });
    return (
    <div id="NavBar">
    <nav>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="light">
      <Container>
        <Navbar.Brand ><Link to={home.url}><img src={logo} alt="Samuel" width={150} height={40}></img></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
                routes.map(route=>(
                    <Nav.Link><Link to={route.url} state={{login:login}}>{route.name}</Link></Nav.Link>
                ))
            }
          {login?
          <NavDropdown title="Tools" id="basic-nav-dropdown" >
          {
            // forms
            formsUser.map(link=>(
              <Nav.Link><Link to={link.url}>{link.name}</Link></Nav.Link> 
            ))
          }
          {
            // protected routes
            protectedRoutes.map(link=>(
              <Nav.Link><Link to={link.url}>{link.name}</Link></Nav.Link> 
            ))
          }
          <Nav.Link><Logout/></Nav.Link>
          </NavDropdown>
          :null}
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