import { useEffect,useState } from "react";
import { useParams } from "react-router";
import { Col, Row, Tab, Table, Tabs } from "react-bootstrap";
import UiBase from "../../base/UiBase";
import BackButton from "../../components/Buttons/BackButton";
import TableComponentColumn from "../../components/Table/TableComponentColumn";
import Group from "../../components/Group";
import TableComponentClass from "../../components/Table/TableComponentClass";
// Project view and repository clicks history
export const ProjectStaistics =()=>{
    const {id}=useParams();
    const [records,setRecords]:Array<any>=useState([]);
    const base=new UiBase();
    const getStatsRec=async()=>{
        const results=await base.util.fetchRequestComplete("/project/get-statistics/"+id,"GET",null,true);
        if(results.ok){
            setRecords(results.json);
        }
    }
    useEffect(()=>{
        getStatsRec();
    },[]);
    return(
        <div>
        <Group>
        <Row>
        <Col md={2}>
        <BackButton url={"/projects"}/>
        </Col>
        <Col md={9} xs={12}>
        <TableComponentClass idKey="_id" results={records} rowSelect={false} >
        <TableComponentColumn size={'30%'} key={"projectName"} columnName={"Project Name"}/>
        <TableComponentColumn size={'5%'} key={"view"} columnName={"View"}/>
        <TableComponentColumn size={'5%'} key={"repositoryClick"} columnName={"Repository Clicks"}/>
        <TableComponentColumn size={'20%'} key={"date"} columnName={"Date"}/>
        <TableComponentColumn size={'40%'} key={"time"} columnName={"Time"}/>
        </TableComponentClass>  
        </Col>
        <Col md={4}>
        </Col>
        </Row>
        </Group>
        </div>
    );
}