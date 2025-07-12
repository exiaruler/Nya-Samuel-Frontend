'use client'
import { Component, forwardRef, useImperativeHandle, useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { ButtonComponent } from "../Buttons/ButtonComponent";
type modalContent={
    title:string,
    children?:any,
    buttonChildren?:any,
    submitCaption?:string,
    hideSubmit?:boolean,
    submit?:any,
    onClose?:any,
}
type State={
    show:boolean,
    showSubmit:boolean,
    caption:string
}
// modal box
/*
export default class ModalBox extends Component<modalContent,State>{
    constructor(props:modalContent) {
            super(props);
            this.state = {
                show:false,
                showSubmit:false,
                caption:'Save'
            };
    }
    componentDidMount(): void {
        if(this.props.submitCaption){
            this.setState({...this.state,caption:this.props.submitCaption});
        }
        if(this.props.hideSubmit){
            this.setState({...this.state,showSubmit:this.props.hideSubmit});
        }
    }
    open(){
        this.setState({...this.state,show:true});
    }
    close=()=>{
        if(this.props.onClose){
            this.props.onClose();
        }
        this.setState({...this.state,show:false});
    }
    async submitHandle(event:any){
        event.preventDefault();
        if(this.props.submit){
            this.props.submit();
        }
    }
    render(){
        return (
        <Modal show={this.state.show} onHide={()=>this.close()}>
        <form onSubmit={(event)=>this.submitHandle(event)}>
        <ModalHeader>
        {this.props.title}
        </ModalHeader>
        <ModalBody>
        {
            this.props.children
        }
        </ModalBody>
        <ModalFooter>
        {
            this.props.buttonChildren
        }
        <ButtonComponent caption={"Close"} size={undefined} type={'button'} onClick={()=>this.close()}/>
        {!this.state.showSubmit?
        <ButtonComponent caption={this.state.caption} size={undefined} type={'submit'}/>
        :null}
        </ModalFooter>
        </form>
        </Modal>
        )
    }
}
*/ 
const ModalBox=forwardRef(function ModalBox(props:modalContent,ref){
    const [show,setShow]=useState(false);
    const [showSubmit,setShowSubmit]=useState(false);
    var saveCaption='Save';

    const open=()=>{
        setShow(true);
    }
    const close=()=>{
        if(props.onClose){
            props.onClose();
        }
        setShow(false);
    }
    const submitHandle=async(event:any)=>{
        event.preventDefault();
        if(props.submit){
            props.submit();
        }
    }
    if(props.submitCaption){
        saveCaption=props.submitCaption;
    }
    if(props.hideSubmit){
        setShowSubmit(props.hideSubmit);
    }
    useImperativeHandle(ref,()=>{
        return {
            open,
            close
        }
    },[]);
    return (
        <Modal show={show} onHide={close}>
        <form onSubmit={submitHandle}>
        <ModalHeader>
        {props.title}
        </ModalHeader>
        <ModalBody>
        {
            props.children
        }
        </ModalBody>
        <ModalFooter>
        {
            props.buttonChildren
        }
        <ButtonComponent caption={"Close"} size={undefined} type={'button'} onClick={close}/>
        {!showSubmit?
        <ButtonComponent caption={saveCaption} size={undefined} type={'submit'}/>
        :null}
        </ModalFooter>
        </form>
        </Modal>
    )
});
export default ModalBox;