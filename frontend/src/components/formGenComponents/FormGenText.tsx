import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import {props} from './FieldProps';

// text field of react bootstrap forms
export class FormGenText extends Component<props>{
    constructor(props:any) {
        super(props);
        this.state = {
            
        };
    }
    private dataType=this.props.type;
    
    render(){
        return(
            
            <Form.Group>
            <Form.Label>{this.props.label}</Form.Label>
            <div className="mb-3">
            <Form.Control id={this.props.name+"Text"} required={this.props.required} onChange={this.props.onChange}  name={this.props.name} type={this.props.type} defaultValue={this.props.value} size={this.props.size} />
            </div>
            <Form.Text id={this.props.name+"Warning"}>{this.props.warning} </Form.Text>
            </Form.Group>
        );
    }
}