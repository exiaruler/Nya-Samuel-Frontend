import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, ListGroup, ListGroupItem, Row, Spinner, Table } from 'react-bootstrap';
import {Project} from '../../base/interfaces/project';
import ProjectAPI from '../../api/ProjectsAPI';
import ProjectCard from '../../components/projects/ProjectCard';
import { error } from 'console';
import { useLocation, useNavigate } from 'react-router';
import { ButtonComponent } from '../../components/ButtonComponent';

// route links
export default function Projects(){
  const api=new ProjectAPI();
  const { state } = useLocation();
  const nav=useNavigate();
  let login=false;
  if(state){
  login=state.login;
  }
  const [projects,setProject]=useState<Project[]>([]);
  const [loading,setloading]=useState(true);
  const getProjects=async()=>{
    try{
      const projectReq= await api.getAllProjects();
      if(projectReq.length>0){
        setloading(false);
        setProject(projectReq);
      }else{
        setloading(false);
        const empty=[{_id:0,name:"No projects available",description:"",url:""}];
        setProject(empty);
      }
    }catch(err){
      if(err){
      setloading(false);
      const empty=[{_id:0,name:"No projects available",description:"",url:""}];
      setProject(empty);
      }
    }
   
  }

  useEffect(() => {
    getProjects();
  },[]);
  
    return(
        <div>
      <Row>
      <Col></Col>
      <Col xs={6}>
      <div className=''>
        <p hidden={true} >Here a list of projects which I have worked on in my spare time. Some will have links to GitHub Repository links other not because of it sensitive nature.</p>
      </div>
      <ListGroup variant="flush">
      {loading ?
      <div className='CentreText'>
      <Spinner animation="border" variant="primary" />
      </div>
      :null}
      {
        projects.map(project=>(
        <ListGroup.Item>
        <ProjectCard name={project.name} description={project.description} url={project.url} key={project._id} id={project._id} login={login}/>
        
        </ListGroup.Item>
        ))
      }
      </ListGroup>
      </Col>
        <Col></Col>
      </Row>
    
    
        </div>
    );
  
  
}