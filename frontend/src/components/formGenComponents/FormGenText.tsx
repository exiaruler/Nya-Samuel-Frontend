'use client'
import { ChangeEventHandler, Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { Props,State } from './interface/textInterface';

// text field of react bootstrap forms
export class FormGenText extends Component<Props,State>{
    constructor(props:Props) {
        super(props);
        this.state = {
            value:""
        };
    }
    private dataType=this.props.type;
    
    render(){
        return(
            <Row>
            <Col xs={this.props.xs} md={this.props.md}>
            <Form.Group>
            <Form.Label>{this.props.label}</Form.Label>
            <div className="mb-3">
            <Form.Control readOnly={this.props.readOnly} disabled={this.props.disable} style={{width:this.props.size}} id={this.props.name+"Text"} required={this.props.required} onChange={this.props.onChange}  name={this.props.name} type={this.props.type} defaultValue={this.props.value} />
            </div>
            <Form.Text id={this.props.name+"Warning"} >{this.props.warning} </Form.Text>
            </Form.Group>
            </Col>
            </Row>
        );
    }
}