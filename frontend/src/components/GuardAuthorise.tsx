import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import UserAPI from "../api/UserAPI";
// guard for user access pages and for login page
const GuardAuthorise=(props:any)=>{
    const user=new UserAPI();
    const { id } = useParams();
    const api=props.api;
    const config=props.config;
    const [valid,setValid]=useState(false);
    const nav=useNavigate();
    var data;
    const checkAccess=async()=>{
        
        try{
            const check=await user.checkLogin();
            if(check){

            }
        }catch(err:any){

        }
    }
    
    return (id) 
    ? <props.component record={data}/>
    : <Navigate to={`/${id}`} replace={true}/>;
}
export default GuardAuthorise;