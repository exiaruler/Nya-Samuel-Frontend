'use client'
import { ChangeEventHandler, Component } from "react"
import { Col, Form, Row } from "react-bootstrap";

type Props={
    label:string,
    name?:string,
    valueKey:string,
    displayKey:string,
    options?:any,
    api?:string,
    required?:boolean,
    readOnly?:boolean,
    disable?:boolean,
    onChange?:ChangeEventHandler,
    warning?:string,
    value:any,
    size?:any,
    md?:number,
    xs?:number
}
type state={
    options:any;
    value:any;
}
export default class FormGenSelect extends Component<Props,state>{
    constructor(props:Props) {
        super(props);
        this.state = {
            options:[],
            value:null
        };
    }
    componentDidMount(): void {
        if(this.props.options){
            this.setState({...this.state,options:this.props.options});
        }else if(this.props.api){

        }
    }
    public onChange(event:any){
        var value=event.target.value;
        if(this.props.valueKey){
            this.setState({...this.state,value:value[this.props.valueKey]});
        }else
        {
            this.setState({...this.state,value:value});
        }
        if(this.props.onChange){
            this.props.onChange(event);
        }
    }
    public setValue(index:number){
        var value=null;
        if(this.props.valueKey){
            value=this.state.options[index][this.props.valueKey];
        }else {
            value=JSON.stringify(this.state.options[index]);
        }
        return value;
    }
    render(){
        return(
            <Row>
            <Col md={this.props.md} xs={this.props.xs}>
            <Form.Group>
            <Form.Label>{this.props.label}</Form.Label>
            <div className="mb-3">
            <Form.Select disabled={this.props.disable} style={{width:this.props.size}} id={this.props.name+"Text"} required={this.props.required} onChange={(event:any)=>this.onChange(event)}  name={this.props.name} value={this.props.value}>
            {
                <option hidden={false}>{''}</option>
            }
            {
                this.state.options.map((opt:any,num:number)=>(
                    <option value={this.setValue(num)}>{opt[this.props.displayKey]}</option>
                ))
            }
            </Form.Select>
            </div>
            <Form.Text id={this.props.name+"Warning"} >{this.props.warning} </Form.Text>
            </Form.Group>
            </Col>
            </Row>
        );
    }
}