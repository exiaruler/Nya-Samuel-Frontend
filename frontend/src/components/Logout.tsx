import { Component } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../api/UserAPI";
import Util from "../base/Util";
export default class Logout extends Component {
    private util=new Util();
    private user=new UserAPI();
     private logOut= async () => {
        try{
            const log=await this.user.logout();
            if(log){
                this.util.removeLogCookie();
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
  