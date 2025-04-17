import React, { useEffect, useState } from 'react';
import './App.css';
import './component.css';
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteSwtich from './components/Navigation/routeswitch';
import { Container } from 'react-bootstrap';
import UiBase from './base/UiBase';
import { useSelector,useDispatch} from 'react-redux';
import {getLoginState, setUser} from "./redux/slice/loginSlice";
import { setPages } from './redux/slice/pageSlice';
import { page } from './base/interfaces/page';
function App() {
  const base=new UiBase();
  const dispatch = useDispatch();
  const loginState=useSelector(getLoginState);
  const [login,setLogin]=useState(false);
  const [pageArr,setPageArr]:any=useState([]);

  const checkLogin= async()=>{
    const userDet=await base.userApi.userDetails();
    if(userDet!=null&&base.util.checkLogCookie()){
      dispatch(setUser(Object(userDet)));
    }else{
      base.util.removeLogCookie();
    }
    setLoginDisplay(loginState);
  }
  const loadPages=async()=>{
    let sessionPages=base.getPagesSession();
    if(sessionPages.length>0){
      dispatch(setPages(sessionPages));
    }else
    {
      const pages:Array<page>=await base.commonApi.getPages('nya-samuel');
      if(pages.length>0){
        dispatch(setPages(pages));
        base.pageSession(pages);
        setPageArr(pages);
      }

    }
  }
  const setLoginDisplay=(log:boolean)=>{
    setLogin(log);
  }

  useEffect(()=>{
    loadPages();
    checkLogin();
  },[]);
  return (
    <div className="App">
    <Navbar login={login} />
    <Container id="ContainerLayout" fluid className=''>
   <RouteSwtich pages={pageArr}/>
   </Container>
    </div>
  );
}

export default App;