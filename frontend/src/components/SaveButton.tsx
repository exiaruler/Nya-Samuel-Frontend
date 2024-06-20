import { Component } from "react";
import {props} from './props/ButtonProp';
import { Button } from "react-bootstrap";
export class SaveButton extends Component<props>{
    constructor(props:any) {
        super(props);
        this.state = {
        };
    }
    render(){
        return(
        <Button variant={this.props.variant||"primary"} type={this.props.type||"submit"}>
        {this.props.caption}
        </Button>    
        );
    }
}