import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import FormGenLibary from "./FormGenLibary";
import { FormAPI } from "../../api/FormAPI";
import Util from "../../base/Util";
const GuardWrapperForm=(props:any)=>{
    const { id } = useParams();
    const {formId}=useParams();
    const formGen=new FormGenLibary();
    const api=props.api;
    const config=props.config;
    const util=new Util();
    const formApi=new FormAPI();
    var form:any;
    const [valid,setValid]=useState(false);
    const nav=useNavigate();
    const validateFormProm=()=>{
        const inHouseForm=formGen.forms;
        return new Promise<void>(async (resolve,reject)=>{
            var resolution=false;
            if(formId!==""){
                for(var i=0; i<inHouseForm.length; i++){
                    if(formId===inHouseForm[i].param){
                        form=inHouseForm[i];
                        resolve();
                        resolution=true;
                        break;
                    }
                }
                if(!resolution){
                    try {
                        const request=await fetch(api+formId,config);
                        if(request.ok){
                            const response=await request.json();
                            if(response){
                                form=response;
                                resolve();
                            }
                        }else reject();
                    } catch (error) {
                        reject();
                    }
                }
            }else{
                reject();
            }
        }).then(
            function(){
                if(id!==""&&id!="0"){
                    apiCall();
                }
            },
            function(){
                nav("/*");
            }
        );
        
    }
    const apiCall=async()=>{
        
            try {
                const request=await fetch(form.retrieveApi+id,config);
                if(request.ok){
                    //const response=await request.json();
                    if(request.ok){
                        setValid(true);
                    }else{
                        nav("/*");
                    }
                }else nav("/*");
            } catch (error) {
                nav("/*");
            }
    }
    validateFormProm();
    return (id) 
    ? <props.component form={form} />
    : <Navigate to={`/${formId}/${id}`} replace={true} />;
}
export default GuardWrapperForm;