import React from 'react';
import { Outlet } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteSwtich from './components/routeswitch';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
    <Navbar/>
    <Container id="ContainerLayout" fluid className=''>
   <RouteSwtich/>
   </Container>
    </div>
  );
}

export default App;
