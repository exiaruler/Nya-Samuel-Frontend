import React, { useEffect, useState,useContext } from 'react';
import { Outlet } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteSwtich from './components/routeswitch';
import { Container } from 'react-bootstrap';
import UiBase from './base/UiBase';
function App() {
  const base=new UiBase();
  const [login,setLogin]=useState(false);
  const [pageProperties,setPageProperties]=useState({
    login:false
  });
  const checkLogin= async()=>{
    const request=await base.userApi.checkLogin();
    if(request){
      setLogin(true);
    }else{
      base.util.removeLogCookie();
    }
  }
  useEffect(()=>{
    checkLogin();
  },[]);
  return (
    <div className="App">
    <Navbar login={login} />
    <Container id="ContainerLayout" fluid className=''>
   <RouteSwtich/>
   </Container>
    </div>
  );
}

export default App;
