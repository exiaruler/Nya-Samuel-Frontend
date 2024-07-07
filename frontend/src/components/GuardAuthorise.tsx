import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import UserAPI from "../api/UserAPI";
import Util from "../base/Util";
// guard for user access pages and for login page
const GuardAuthorise=(props:any)=>{
    const user=new UserAPI();
    const util=new Util();
    let valid=false;
    const nav=useNavigate();
    const checkAccess=async()=>{
        if(util.checkLogCookie()){
            nav("/");
        }else valid=true;
    }
    checkAccess();
    return (valid) 
    ? <props.component/>
    : <Navigate to={`/`} replace={true}/>;
}
export default GuardAuthorise;