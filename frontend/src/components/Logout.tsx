import { Link, useNavigate } from "react-router-dom";
import UiBase from "../base/UiBase";
import { useDispatch } from "react-redux";
import {clearUser} from "../redux/slice/loginSlice";


export default function Logout(){
  var base=new UiBase();
  var dispatch=useDispatch();
  const nav=useNavigate();
  const logOut= async () => {
    try{
        const log=await base.userApi.logout();
        if(log){
            base.util.removeLogCookie();
            dispatch(clearUser());
            window.location.href = "/";
        }
    }catch(err){
        throw err;
    }
  } 
  return(
    <div> 
    <Link to="/" onClick={logOut}>Logout</Link>
    </div>
  );
}
