import { useParams } from "react-router";
import FormGenLibary from "../../components/formGenComponents/FormGenLibary";
import { Alert, Button, Col, Form, ProgressBar, Row, Spinner } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Component } from "../../base/interfaces/component";
import {Util} from '../../base/Util';
import BackButton from '../../components/BackButton';
import { SaveButton } from "../../components/SaveButton";
import { FormAPI } from "../../api/FormAPI";
export default function FormPage(props:any){
  var formJson;
  const [formLay,setFormLay]=useState({
    formName:"",
    postapi:"",
    updateapi:"",
    headers:"",
    redirect:"",
    retrieveApi:""
  });
  const api=new FormAPI();
  const [formError,setFormError]=useState<any>({});
  const {formId}=useParams();
  const {id}=useParams();
  var record:any={};
  const [formArr,setFormArr]=useState<Component[]>([]);
  const [load,setLoad]=useState(true);
  const [loadSate,setLoadState]=useState(0);
  const [error,setError]=useState(true);
  const [formErrorMsg,setFormErrorMsg]=useState<any>({
    hide:true,
    error:""
  });
  const nav=useNavigate();
  const util=new Util();
  const formLib= new FormGenLibary();
  // set prop from the guardwrapper if possible
  const setFormProp=()=>{
    if(props.form){
      formJson=props.form;
      setLoadState(10);
      if(formJson){
        setFormLay({
          formName:formJson.name,
          postapi:util.getApiUrl()+formJson.postApi,
          updateapi:util.getApiUrl()+formJson.updateApi,
          headers:formJson.headers,
          redirect:formJson.redirect,
          retrieveApi:util.getApiUrl()+formJson.retrieveApi
        });
        renderForm(formJson);
      }
    }else findForm();
    
  }


  const findForm=async ()=>{
    // find form inhouse first before api call
    if(props.form){
      setLoadState(10);
      renderForm(props.form);
    }
    else{
      let form=formLib.findInhouseForm(formId);
    if(form!=null){
      setLoadState(10);
      renderForm(form);
    }else{
      try {
        const request=await fetch(util.getApiUrl()+"/form/get-form/"+formId,util.apiCallConfig("GET"));
        const response=await request.json();
        if(id!=="0"){
          const recordRequest=await api.getRecord(util.getApiUrl()+response.retrieveApi,id);
          record=recordRequest;
        }
        renderForm(response);
      } catch (error) {
        
      }
    }
    }
    
  }
  const renderForm=(formObj:any)=>{
    const renderModel=new Promise<void>((resolve,reject)=>{
      if(formObj.stateModel){
        setFormLay({
          formName:formObj.name,
          postapi:util.getApiUrl()+formObj.postApi,
          updateapi:util.getApiUrl()+formObj.updateApi,
          headers:formObj.headers,
          redirect:formObj.redirect,
          retrieveApi:util.getApiUrl()+formObj.retrieveApi
        });
        
        resolve();
      }else{
        reject();
      }
    });
    renderModel.then(
      function(){
        var keyArr=[];
        var errorJson={};
        for( var i=0; i<formObj.stateModel.length; i++){
          var key=formObj.stateModel[i].key;
          keyArr.push(key);
          errorJson=Object.assign({}, errorJson, { [key]: '' });
        }
        setFormError(errorJson);
        setLoadState(50);
        renderFormFields(formObj.form,keyArr);
      },
      // display error message
      function(){

      }
    );
  }
  const renderFormFields=(fieldArr:any,keyArr:any)=>{
    var fields: any[]=[];
    const renderFields=new Promise<void>((resolve,reject)=>{
      const fieldsTotal=fieldArr.length;
      var count=0;
      let loadAdd=50/fieldsTotal;
      for(var i=0; i<fieldArr.length; i++){
        var field=fieldArr[i];
        var comp=formLib.findComponent(field.component);
        if(comp==null){
          reject();
          break;
        }
        var formErr=formError[keyArr[count]];
        var setValue="";
        if(id!="0"){
          setValue=record[keyArr[count]];
        }
        var compAtt={
          // field props for component
          field:field,
          // warning state
          error:formErr,
          // component from library
          component:comp,
          // name
          name:keyArr[count],
          //value
          value:setValue
        };
        fields.push(compAtt);
        setLoadState(loadSate+loadAdd);
        count++;
      }
      if(fieldsTotal===count){
        setFormArr(fields);
        resolve();
      }else reject();
    });
    renderFields.then(
      function(){
        //loadData();
        setLoad(false);
        var btn=document.getElementById('SubmitBtn') as HTMLElement;
        btn.hidden=false;
      },
      function(){

      }
    )
  }

  const getValuesFromFields=()=>{
    var form=document.getElementById('FormField') as HTMLFormElement;
    var inputArr=[];
    var elementArr=form.elements;
    for(var i=0; i<elementArr.length; i++){
      var field=elementArr[i] as HTMLFormElement;
      if(field.type!="submit"){
        var key=field.name;
        var value=field.value;
        var input={[key]:value};
        inputArr.push(input);
      }
    }
    return inputArr;
  }
  const createDataJson=(array:any)=>{
    const jsonObject = Object.assign({}, ...array);
    return jsonObject
  }
  const writeError=async(errorArr:any)=>{
    for(var i=0; i<errorArr.length; i++){
      var value=errorArr[i];
      var key=Object.keys(value)[0];
      var error:any=value[key];
      setFormError({...formError,[key]:error});
      var errorEle=document.getElementById(key+'Warning') as HTMLElement;
      errorEle.innerHTML=error;
    }
  }
  const submitForm=async (event:any)=>{
    // get values from input and turn into json for data
    event.preventDefault();
    const arr=getValuesFromFields();
    const json=createDataJson(arr);
    
    // update record 
    if(id!=="0"){
      try{
        const request=await fetch(formLay.updateapi+id,{
          method:'PUT',
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
            apikey:formLay.headers
          },
          body:JSON.stringify(json)
        });

        if(request.ok){
          nav(formLay.redirect,{ state:{ login:true} });
        }else
        {
          const response=await request.json();
          writeError(response.fields);
          if(response.error!==""){
            setFormErrorMsg({
              hide:false,
              error:response.error
            });
          }else{
            setFormErrorMsg({
              hide:true,
              error:response.error
            });
          }
        }
      }catch(err){
        util.unauthorisedAccess();
      }

    }else
    // submit new record
    {
      try{
        const request=await fetch(formLay.postapi,
          {
            method:'POST',
            credentials: 'include',
            headers:{
              'Content-Type': 'application/json',
              apikey:formLay.headers
            },
            body:JSON.stringify(json)
          });
          if(request.ok){
            nav(formLay.redirect,{ state:{ login:true} });
          }else{
            const response=await request.json();
            writeError(response.fields);
            if(response.error!==""){
              setFormErrorMsg({
                hide:false,
                error:response.error
              });
            }else{
              setFormErrorMsg({
                hide:true,
                error:response.error
              });
            }
          }
      }catch(err){
        util.unauthorisedAccess();
      }
    }

  }
 
  useEffect(() => {
     setFormProp();
  },[]);
  return(
    <div>
    <Row>
    <Col>
    {!load?
    <BackButton url={-1}/>
    :null}
    </Col>
    <Col xs={8}>
    <div id="FormDiv">
    <div className="CentreText">
    <h1>{formLay.formName}</h1>
    </div>
    <Form id={"FormField"} onSubmit={submitForm} >
    {load ?
      <div className='CentreText'>
      <ProgressBar now={loadSate} />
      </div>
      :null}
    {
      // writes form fields
      formArr.map(form=>(
        React.createElement(form.component,
          {label:form.field.label,type:form.field.type,name:form.name,required:form.field.required,rows:form.field.rows,warning:form.error,value:form.value})
      ))
    }
    <div id="ErrorDiv" hidden={error}>
    <h2>Something went wrong please try again</h2> 
    </div>
    <Alert variant='warning' key='warning' hidden={formErrorMsg.hide}>
    {formErrorMsg.error}
    </Alert>
    <Button id="SubmitBtn" variant="primary" size="lg" hidden={true} type="submit">Save</Button>
    
    </Form>
    </div>
    </Col>
    <Col>
    </Col>
    </Row>

    </div>);
}

