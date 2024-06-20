import { Component } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../api/UserAPI";
export default class Logout extends Component {
    private user=new UserAPI();
     private logOut= async () => {
        try{
            const log=await this.user.logout();
            if(log){
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
  