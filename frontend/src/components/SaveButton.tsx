
import { Button, ButtonGroup } from "react-bootstrap";
import { ButtonComponent } from "./ButtonComponent";
export class SaveButton extends ButtonComponent{
    
    
    render(){
        return(
        <ButtonGroup >
        <Button variant={this.props.variant||"primary"} type={"submit"}>
        {this.props.caption}
        </Button>   
        </ButtonGroup> 
        );
    }
}