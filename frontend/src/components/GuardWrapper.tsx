import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

const GuardWrapper=(props:any)=>{
    const { id } = useParams();
    const api=props.api;
    const config=props.config;
    const [valid,setValid]=useState(false);
    const nav=useNavigate();
    var data;
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
    apiCall();
    return (id) 
    ? <props.component record={data}/>
    : <Navigate to={`/${id}`} replace={true}/>;
}
export default GuardWrapper;