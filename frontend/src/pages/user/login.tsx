import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { FormGenText } from "../../components/formGenComponents/FormGenText";
import { SaveButton } from "../../components/SaveButton";
import UserAPI from "../../api/UserAPI";
export default function Login(){
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
    const user=new UserAPI();
      
      const onChange=(key:any,value:any)=>{
        setForm({...form,[key]:value});
      }
      const submit=async(event:any)=>{
        event.preventDefault();
        try{
          const login=await user.login(form);
          if(login.message==="Successfully Authenticated"){
            
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
        <Col>
        <Form onSubmit={submit}>
        <FormGenText label={"Username"} type={"string"} name={"username"} rows={0} required={false} onChange={(event: any) => onChange(event.target.name, event.target.value)} warning={formWarning.username} value={""} size={undefined}/>
        <FormGenText label={"Password"} type={"password"} name={"password"} rows={0} required={false} onChange={(event: any) => onChange(event.target.name, event.target.value)} warning={formWarning.password} value={""} size={undefined}/>
        <Alert variant='warning' key='warning' hidden={formErrorMsg.hide}>
        {formErrorMsg.error}
        </Alert>
        <SaveButton caption={"Login"} variant={"primary"} onClick={""} size={"lg"} active={false} disabled={false} type={"submit"} />
        
        </Form>
        </Col>
        <Col>
        </Col>
        </Row>
        </div>
    )
}