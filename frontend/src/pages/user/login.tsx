import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { FormGenText } from "../../components/formGenComponents/FormGenText";
import { SaveButton } from "../../components/SaveButton";
import UserAPI from "../../api/UserAPI";
import UiBase from "../../base/UiBase";
export default function Login(){
    const base=new UiBase();
    const [form,setForm]=useState({
        username:"",
        password:""
    });
    const [formWarning,setFormWarnings]=useState({
      username:"",
      password:""
  });
    const [formErrorMsg,setFormErrorMsg]=useState<any>({
      hide:true,
      error:""
    });
    
    const submit=async(event:any)=>{
        event.preventDefault();
        try{
          const login=await base.userApi.login(form);
          if(login.message==="Successfully Authenticated"){
            let timeout=base.util.addMillsToCurrent(login.timeout);
            document.cookie="id="+login.id+"; expires="+timeout;
            window.location.href="/";
          }else
          {
            const error:any=login;
            setFormWarnings({
              username:"",
              password:""
            });
            setFormWarnings({
              username:error.fields[0].username,
              password:error.fields[1].password
            });
            if(error.error!==""){
              setFormErrorMsg({
                hide:false,
                error:error.error
              });
            }else{
              setFormErrorMsg({
                hide:true,
                error:error.error
              });
            }

          }
        }catch(err){

        }
      }
    return(
        <div>
        <Row>
        <Col>
        </Col>
        <Col xs={8} md={3}>
        <Form onSubmit={submit}>
        <FormGenText label={"Username"} type={"string"} name={"username"} rows={0} required={false} onChange={(event: any) => base.onChange(event.target.name, event.target.value, setForm, form)} warning={formWarning.username} value={""} size={undefined} api={""}/>
        <FormGenText label={"Password"} type={"password"} name={"password"} rows={0} required={false} onChange={(event: any) => base.onChange(event.target.name, event.target.value, setForm, form)} warning={formWarning.password} value={""} size={undefined} api={""}/>
        <Alert variant='warning' key='warning' hidden={formErrorMsg.hide}>
        {formErrorMsg.error}
        </Alert>
        <SaveButton id={""} caption={"Login"} variant={"primary"} onClick={""} size={"lg"} active={false} disabled={false} type={"submit"} />
        
        </Form>
        </Col>
        <Col>
        </Col>
        </Row>
        </div>
    )
}