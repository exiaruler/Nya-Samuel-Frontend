'use client'
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap"
interface Props{
    data:Array<Object>;
    valueKey:string;
    titleKey:string;
    bodyKey:string;
    onClick?:any;
    mdCol?:number;
    smCol?:number;
}
const GridCard=forwardRef(function GridCard(props:Props,ref){
    var valueKey="";
    var data:any=[];
    var recordRef=useRef(null);
    if(props.data){
        data=props.data;
    }
    if(props.valueKey){
        valueKey=props.valueKey;
    }
    const onClick=(event:any,index:number)=>{
        recordRef.current=data[index];
        if(props.onClick){
            props.onClick(event);
        }
    }
    const getSelectedCard=()=>{
        return recordRef.current;
    }
    useImperativeHandle(ref,()=>{
            return {
               getSelectedCard
            }
        },[]);
    return(
        <div>
        <Row>
        {
            props.data.map((obj:any,num:number)=>(
                <Col sm={props.smCol} md={props.mdCol}key={obj[valueKey]||num}>
                <div>
                <Card key={obj[valueKey]||num} onClick={(event:any)=>onClick(event,num)}>
                <CardTitle>{obj[props.titleKey]}</CardTitle>
                <CardBody>{obj[props.bodyKey]}</CardBody>
                </Card>
                </div>
                </Col>
            ))
        }
        </Row>
        </div>
    )
})
export default GridCard;