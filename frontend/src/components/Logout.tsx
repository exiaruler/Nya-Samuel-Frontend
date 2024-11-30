import { Component } from "react";
import { Link } from "react-router-dom";
import UiBase from "../base/UiBase";
export default class Logout extends Component {
    private base=new UiBase();
 
     private logOut= async () => {
        try{
            const log=await this.base.userApi.logout();
            if(log){
                this.base.util.removeLogCookie();
                window.location.href = "/";
            }
        }catch(err){
            throw err;
        }
    }
    
    render() {
      return(   
        <div> 
        <Link to="/" onClick={this.logOut}>Logout</Link>
        </div>
      );
    }
  }
  