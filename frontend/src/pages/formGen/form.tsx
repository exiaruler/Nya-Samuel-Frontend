import { useParams } from "react-router";
import FormGenLibary from "../../components/formGenComponents/FormGenLibary";
import { Alert, Button, Col, Form, ProgressBar, Row, Spinner } from "react-bootstrap";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Component } from "../../base/interfaces/component";
import BackButton from '../../components/BackButton';
import { SaveButton } from "../../components/SaveButton";
import { ButtonComponent } from "../../components/ButtonComponent";
import { FormAPI } from "../../api/FormAPI";
import UiBase from "../../base/UiBase";
const form=forwardRef (function FormPage(props:any,ref){
  const { state } = useLocation();
  var formJson;
  let location = useLocation();
  const [formLay,setFormLay]=useState({
    urlLocation:"",
    formName:"",
    postapi:"",
    updateapi:"",
    deleteapi:"",
    headers:"",
    redirect:"",
    retrieveApi:"",
    settingOverride:false,
    form:null
  });
  var currentForm=location.pathname;
  // form used in entry record page
  var entryUsed=false;
  // used for settings
  const [recordSetId,setRecordSetId]=useState("");
  let stateModel=useRef({});
  var errorClearRef:any=useRef([]);
  const api=new FormAPI();
  const [formError,setFormError]=useState<any>({});
  const {formId}=useParams();
  let {id}=useParams();
  var record:any=useRef({});
  var formUpdate=useRef(false);
  const [formArr,setFormArr]=useState<Component[]>([]);
  const [load,setLoad]=useState(true);
  const [loadSate,setLoadState]=useState(0);
  const [error,setError]=useState(true);
  const [formErrorMsg,setFormErrorMsg]=useState<any>({
    hide:true,
    error:""
  });
  var keyArr:any=useRef([]);
  const nav=useNavigate();
  const base=new UiBase();
  const formLib= new FormGenLibary();
  
  const createApiUrl=(api:string)=>{
    var url="";
    if(api!=""&&api!=undefined){
      url=base.util.getApiUrl()+api;
    }
    return url;
  }
  // set prop from the guardwrapper if possible
  const setFormProp=()=>{
    errorClearRef.current=[];
    if(props.form){
      formJson=props.form;
      setLoadState(10);
      if(formJson){
        setFormLay({
          urlLocation:location.pathname,
          formName:formJson.name,
          postapi:base.util.getApiUrl()+formJson.postApi,
          updateapi:base.util.getApiUrl()+formJson.updateApi,
          deleteapi:createApiUrl(formJson.deleteApi),
          headers:formJson.headers,
          redirect:formJson.redirect,
          retrieveApi:base.util.getApiUrl()+formJson.retrieveApi,
          settingOverride:formJson.setting,
          form:formJson.form
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
        const request=await fetch(base.util.getApiUrl()+"/form/get-form/"+formId,base.util.apiCallConfig("GET"));
        const response=await request.json();
        if(id!=="0"){
          if(props.record===null){
            const recordRequest=await api.getRecord(base.util.getApiUrl()+response.retrieveApi,id);
            record.current=recordRequest;
          }else if(props.record!=null) record.current=props.record;
        }
        if(response.setting){
          const recordRequest=await api.getRecordSingle(base.util.getApiUrl()+response.retrieveApi);
          record.current=recordRequest;
          setRecordSetId(record.current._id);
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
          urlLocation:location.pathname,
          formName:formObj.name,
          postapi:base.util.getApiUrl()+formObj.postApi,
          updateapi:base.util.getApiUrl()+formObj.updateApi,
          deleteapi:createApiUrl(formObj.deleteApi),
          headers:formObj.headers,
          redirect:formObj.redirect,
          retrieveApi:base.util.getApiUrl()+formObj.retrieveApi,
          settingOverride:formObj.setting,
          form:formObj.form
        });
        stateModel.current=originalFormSet(formObj.stateModel);
        resolve();
      }else{
        reject();
      }
    });
    renderModel.then(
      function(){
        var errorJson={};
        for( var i=0; i<formObj.stateModel.length; i++){
          var key=formObj.stateModel[i].key;
          keyArr.current.push(key);
          errorJson=Object.assign({}, errorJson, { [key]: '' });
        }
        setFormError(errorJson);
        setLoadState(50);
        renderFormFields(formObj.form,keyArr.current,formObj.setting);
      },
      // display error message
      function(){
        setError(false);
        setLoad(false);
      }
    );
  }
  const originalFormSet=(stateModel:Array<any>)=>{
    var clear:any={};
    for(var i=0; i<stateModel.length; i++){
      var part=stateModel[i];
      var key=part.key;
      var error:any={};
      error[key]='';
      errorClearRef.current.push(error);
      clear[part.key]=part.value;
    }
    return clear;
  }
  const clearForm=(update:boolean=false)=>{
    id="0";
    formUpdate.current=false;
    record.current={};
    insertValuesEntry(stateModel.current);
    setFormErrorMsg({
        hide:true,
        error:""
    });
    if(!entryUsed)nav("/form/"+formId+"/0",{ state:{ login:true} });
    writeError(errorClearRef.current);
    if(props.entry){
      props.clearHandle(update);
    }
  }
  const clearError=()=>{
    writeError(errorClearRef.current);
  }
  const deleteRecord=async()=>{
    if(id!="0"){
      try{
        const request=await fetch(formLay.deleteapi+id,{
          method:'DELETE',
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
            apikey:formLay.headers
          }
        });
        if(await request.ok){
          clearForm(true);
        }
      }catch(err){
        base.util.unauthorisedAccess();
      }
    }
  }
  const renderFormFields=(fieldArr:any,keyArr:any,settingOverride:boolean)=>{
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
        if(id!="0"||settingOverride){
          setValue=record.current[keyArr[count]];
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
        setError(false);
        setLoad(false);
      }
    )
  }

  const insertValuesEntry=(entry:any)=>{
    var form=document.getElementById('FormField') as HTMLFormElement;
    var elementArr=form.elements;
    for(var i=0; i<elementArr.length; i++){
      var field=elementArr[i] as HTMLFormElement;
      var key=field.name;
      var value=entry[key];
      if(field.type!="submit"){
        if(field.type==="checkbox"){
          field.checked=value;
        }else{
          field.value=value;
        }
      }
    }
  }
  const getValuesFromFields=()=>{
    var form=document.getElementById('FormField') as HTMLFormElement;
    var inputArr=[];
    var elementArr=form.elements;
    for(var i=0; i<elementArr.length; i++){
      var field=elementArr[i] as HTMLFormElement;
      if(field.type!="submit"){
        var value;
        var key=field.name;
        if(field.type==="checkbox"){
          value=field.checked;
        }else{
          value=field.value;
        }
        var input={[key]:value};
        record.current[key]=value;
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
      if(key!==""){
        var error:any=value[key];
        setFormError({...formError,[key]:error});
        var errorEle=document.getElementById(key+'Warning') as HTMLElement;
        errorEle.innerHTML=error;
      }
    }
  }
  const submitForm=async (event:any)=>{
    // get values from input and turn into json for data
    event.preventDefault();
    const arr=getValuesFromFields();
    const json=createDataJson(arr);
    // update forms that are setting enabled
    if(formLay.settingOverride){
      try{
        const request=await fetch(formLay.updateapi+recordSetId,{
          method:'PUT',
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
            apikey:formLay.headers
          },
          body:JSON.stringify(json)
        });
        submissionDirect(request);
      }catch(err){
        base.util.unauthorisedAccess();
      }
    // non setting enbale process
    }else if(id!=="0"){
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
        submissionDirect(request);
      }catch(err){
        base.util.unauthorisedAccess();
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
          submissionDirect(request);
      }catch(err){
        base.util.unauthorisedAccess();
      }
    }
  }

  const submissionDirect=async (request:any)=>{
    if(request.ok){
      id="0";
      if(entryUsed)clearForm(true);
      if(!entryUsed){
        nav(formLay.redirect,{ state:{ login:true} });
      }else props.submitHandle();
      writeError(errorClearRef.current);
      setFormErrorMsg({
        hide:true,
        error:""
      });
    }else
    {
      if(entryUsed)formUpdate.current=true;
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
  }
  const changeForm=()=>{
    let result=false;
    if(formLay.urlLocation!=currentForm&&formLay.urlLocation!=""){
      result=true;
    }
    return result;
  }
  
  
  useImperativeHandle(ref,()=>{
    return {
      clearForm,
      clearError
    }
  },[]);
  if(changeForm()){
    const form:any=document.getElementById('FormRender') as HTMLElement;
    //form.innerHTML=""
    setFormProp();
  }
  if(props.entry){
    entryUsed=true;
    if(props.record&&props.record!=null&&!props.clearAction){
      id=props.id;
      if(!formUpdate.current||id!=record.current[props.valueKey])record.current=props.record;
      insertValuesEntry(record.current);
    }else id="0";
  }
  
  useEffect(() => {
     setFormProp();
  },[]);
  return(
    <div>
    <Row>
    <Col >
    {!load?
    <BackButton url={-1} onClick={props.onClick}/>
    :null}
    </Col>
    <Col md={8} xs={12}>
    <div id="FormDiv">
    <div className="CentreText">
    {!entryUsed?
    <h1>{formLay.formName}</h1>
    :null}
    </div>
    <Form id={"FormField"} onSubmit={submitForm} >
    {load ?
      <div className='CentreText'>
      <ProgressBar now={loadSate} />
      </div>
      :null}
    <div id="FormRender">
    {
      // writes form fields
      formArr.map(form=>(
        React.createElement(form.component,
          {label:form.field.label,type:form.field.type,name:form.name,required:form.field.required,rows:form.field.rows,warning:form.error,value:form.value})
      ))
    }
    </div>
    <div id="ErrorDiv" hidden={error}>
    <h2>Something went wrong please try again</h2> 
    </div>
    <Alert variant='warning' key='warning' hidden={formErrorMsg.hide}>
    {formErrorMsg.error}
    </Alert>
    {!formLay.settingOverride?
    <Button id="ClearBtn" variant="primary" size="lg" onClick={()=>clearForm(false)} >Clear</Button>
    :null}
    {formLay.deleteapi!==""? 
    <Button id="DeleteBtn" variant={'danger'} onClick={deleteRecord} size="lg" >Delete</Button>
    :null}
    <Button id="SubmitBtn" variant="primary" size="lg" hidden={true} type="submit">Save</Button>
    </Form>
    </div>
    </Col>
    <Col>
    </Col>
    </Row>

    </div>);
});
export default form;
