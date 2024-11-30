import { type } from "os";
import { Component, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {props} from './CheckBoxProps';
export class FormGenCheckBox extends Component<props>{
    private componentId=this.props.name+"Check";
    constructor(props:any) {
        super(props);
        this.state = {
            
        };
    }
   
    render(){
        return(
            <Col md="3">
            <div className="mb-3">
            <Form.Group>
            <Form.Check id={this.componentId} required={this.props.required} reverse={true} label={this.props.label} defaultChecked={this.props.value} onChange={this.props.onChange} name={this.props.name} />
            <Form.Text id={this.props.name+"Warning"}>{this.props.warning} </Form.Text>
            </Form.Group>
            </div>
            </Col>
        );
    }
}