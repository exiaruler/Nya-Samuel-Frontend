import React, { useEffect, useState } from 'react';
import './App.css';
import './component.css';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteSwtich from './components/Navigation/routeswitch';
import { Container } from 'react-bootstrap';
import UiBase from './base/UiBase';
import { useSelector,useDispatch} from 'react-redux';
import {getLoginState,getUser, setUser,clearUser} from "./redux/slice/loginSlice";

function App() {
  const base=new UiBase();
  const dispatch = useDispatch();
  const loginState=useSelector(getLoginState);
  const [login,setLogin]=useState(false);
  
  const checkLogin= async()=>{
    const userDet=await base.userApi.userDetails();
    if(userDet!=null){
      dispatch(setUser(Object(userDet)));
    }else{
      base.util.removeLogCookie();
    }
    setLoginDisplay(loginState);
  }
  const setLoginDisplay=(log:boolean)=>{
    setLogin(log);
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