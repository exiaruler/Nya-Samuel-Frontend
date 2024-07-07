import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";

const GuardWrapper=(props:any)=>{
    const { id } = useParams();
    const { state } = useLocation();
    const api=props.api;
    const config=props.config;
    const [valid,setValid]=useState(false);
    const nav=useNavigate();
    var data=null;
    
    const apiCall=async()=>{
            
            try {
                const request=await fetch(api+id,config);
                const response=await request.json();
                if(response){
                    setValid(true);
                    data=response;
                }else{
                    nav("/*");
                }
            } catch (error) {
                nav("/*");
            }
    }
    // check if record was passed from previous page. if not send request to check to check if it's valid
    if(state==null){
        apiCall();
    }else if(state!=null&&state.record){
        data=state.record;
    }
    return (id) 
    ? <props.component record={data}/>
    : <Navigate to={`/${id}`} replace={true}/>;
}
export default GuardWrapper;