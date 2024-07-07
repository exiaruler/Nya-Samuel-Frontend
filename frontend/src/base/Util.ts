import { Url } from 'url';
import Base from './Base';
import { Common } from './Common';
export class Util extends Base {
  public common=new Common();
  
    // converts date to show month style
  public  dateConversionMonth(date:any){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dateArr=date.split("/");
        const month = months[dateArr[0]];
        return dateArr[1]+" "+month+" "+dateArr[2]
    }
  public elementGet(elementId:any){
      const get=document.getElementById(elementId);
      if(get!=null){
        const ele=get+".__reactProps$0ywopfjtiphh";
        return ele;
      }
      return "does not exist";
    }

   public cutOffString(text:string,cut:number,endtag:string=""){
    var result="";
    result=text.substring(0,cut);
    if(result!=text){
      result=result+endtag;
    }
    return result;
   }
   public addMillsToCurrent(milliseconds:number){
    // Get the current date and time
    let currentDate = new Date();
    // Add the specified milliseconds
    currentDate.setMilliseconds(currentDate.getMilliseconds() + milliseconds);
    return currentDate;
   }
   public setJsonValue(json:any,key:any,value:any){
      var currentJson=json;
      currentJson[key]=value;
      return currentJson;
    }
   public createRoute(base:string,route:string,param:string=""){
      var url=this.getApiUrl()+base+route;
      if(param!==""){
        url=url+"/"+param
      }
      return url;
   }
   public sendAlert(error:any){
      alert(error);
    }
    public setAttributeValue(element:any,attribute:any,value:any){
      document.getElementById(element)?.setAttribute(attribute,value);
    }
    public throwError(err:any){
      console.error('Oh shit something happened');
      throw err;
    }
    public unauthorisedAccess(){
      window.location.href='/';
    }
    public removeLogCookie(){
      let currentDate = new Date();
      let timeout=currentDate.setMilliseconds(currentDate.getMilliseconds() - 10000);
      document.cookie="id= ; expires="+timeout;
    }
    public checkLogCookie(){
      var login=false;
      const cookie=document.cookie;
      const cookieArr=cookie.split(";");
        if(cookieArr[0].includes("id=")){
          var id=cookieArr[0].split("=")[1];
          if(id!=""&&id.length==24){
            login=true;
          }
        }
      return login
    }
}
export default Util;