import { Component, useEffect, useState } from 'react';
import { CardText } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import gitlogo from './assets/github-mark.png';
import { Link,useNavigate } from 'react-router-dom';
//import props from './../../base/interfaces/project';
import { ButtonComponent } from '../ButtonComponent';
import ProjectAPI from '../../api/ProjectsAPI';
import Util from '../../base/Util';
export default function ProjectCard(props:any){
  const id=props.id;
  var disableStyle='';
  const util=new Util();
  const login=props.login;
  const navigate = useNavigate();
  const project=new ProjectAPI();
  const [url,setUrl]=useState(false);
  const showGitLogo=(url:String)=>{
    if(url!==""){
      setUrl(true);
    }else setUrl(false);
  }
  const disableLink=()=>{
    const disable='disabled-link';
    if(id===0){
      disableStyle=disable;
    }
  }
  const deleteProject=async(obj: any)=>{
    const id=obj.id;
    const del=await project.deleteProject(id);
    if(del?.status==200){
      navigate(0);
    }
  }
  useEffect(()=>{
    showGitLogo(props.url)
    disableLink();
  });
  return (
    <div>
    <Card>
    <Card.Body>
    <Link to={'/project/'+id} className={disableStyle} state={{record:props}}>
    <Card.Title as="h4">{props.name}</Card.Title>
    <CardText>{util.cutOffString(props.description,100," ....")}</CardText>
    </Link>
    <div>
      {url?
      <Card.Link href={props.url}><img src={gitlogo} height={30} width={30} alt="Repistory"/></Card.Link>
    :null}
    {login?
    <>
    <Link to={"/form/project/"+id} state={{record:props}}><ButtonComponent caption={'Update'} variant={''} onClick={undefined} size={''} active={false} disabled={false} type={undefined} /></Link>
    <Link to={""} state={{login:login}} onClick={()=>deleteProject({id})}><ButtonComponent caption={'Delete'} variant={'danger'} onClick={undefined} size={''} active={false} disabled={false} type={undefined} /></Link>
    </>
    :null}
    </div>
    
    </Card.Body>
    
    </Card>
    </div>);
}
