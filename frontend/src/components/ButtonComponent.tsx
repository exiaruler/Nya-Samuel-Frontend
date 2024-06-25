import { Component } from "react";
import {props} from './props/ButtonProp';
import { Button, ButtonGroup } from "react-bootstrap";
export class ButtonComponent extends Component<props>{
    render(){
        return(
        <ButtonGroup >
        <Button variant={this.props.variant||"primary"} type={this.props.type}>
        {this.props.caption}
        </Button> 
        </ButtonGroup>   
        );
    }
}