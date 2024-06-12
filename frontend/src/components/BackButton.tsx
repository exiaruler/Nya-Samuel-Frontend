import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BackLogo from "../assets/icons8-back-arrow-48.png";
export default function BackButton(props:any){
    var caption="Back";
    var url="/";
    var width=40;
    var height=40;
    const nav=useNavigate();
    const setBack=()=>{
        if(props){
            if(props.caption){
                caption=props.caption;
            }
            if(props.url){
                url=props.url;
            }
        }
    }
    setBack();
    const goBackto=()=>{
        nav(url);
    }
        return(
            <div>
            <Button variant="light" size="lg" onClick={goBackto} >
            <img src={BackLogo} alt="Back" width={width} height={height}/>
            </Button>
            </div>
        );
}