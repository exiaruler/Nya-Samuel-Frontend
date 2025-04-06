import Util from "./Util";
import UserAPI from "../api/UserAPI";
// base class for UI pages
export default class UiBase {
    // common util tools
    public util=new Util();
    // user api calls
    public userApi=new UserAPI();
    
    public UiBase(){

    }
    // form on change handler
    public onChange(key:any,value:any,setForm:any,form:any){
        setForm({...form,[key]:value});
    }
}