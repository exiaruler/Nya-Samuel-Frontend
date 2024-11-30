import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import Util from "../base/Util";
const GuardWrapper=(props:any)=>{
    const { id } = useParams();
    const { state } = useLocation();
    const util=new Util();
    const api=props.api;
    const [valid,setValid]=useState(false);
    const nav=useNavigate();
    var data=null;
    var code=200;
    const apiCall=async()=>{
            try {
                const request=await util.fetchRequest(api+id,"GET");
                code=await request.status
                let ok=await request.ok;
                if(ok){
                    const response=await request.json();
                    setValid(true);
                    data=response;
                }else{
                    nav("/*",{ state: { unauthorised:util.checkAuthorise(code) }});
                }
            } catch (error) {
                nav("/*",{ state: {  unauthorised:util.checkAuthorise(code) }});
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