import { Component } from "react";
import {props} from './props/ButtonProp';
import { Button, ButtonGroup } from "react-bootstrap";
export class ButtonComponent extends Component<props>{
    render(){
        return(
        <ButtonGroup className="Button-Regular">
        <Button  variant={this.props.variant||"primary"} onClick={this.props.onClick} type={this.props.type} size={this.props.size}>
        {this.props.caption} 
        </Button> 
        </ButtonGroup>  
        );
    }
}