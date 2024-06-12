import axios from 'axios';
import { Url } from 'url';
import Base from './Base';
class Util extends Base {
 // return user data promoise
    async getUser(){
      var data;
      try{
        var res=await axios({
          method: "GET",
          withCredentials: true,
          url:this.getApiUrl()+"/user/user"}
          );
        data=await res.data;
      }catch(err){
        console.error(err);
      }
      return data;
  }
  // Use javascript standard to make API call
  async apiCall(http:any,config:any){
    var data;
    try{
      const res=await fetch(http,config);
      data=await res;
      return data;
    }catch(err){
      console.error(err);
    }
    //return data;
  }
  // Use React axios library to make API call
  async axiosCall(json:object){
    var data;
    try{
      const res=await axios(json);
      data=await res;
    }catch(err){
      console.error(err);
    }
    return data;
  }
    // converts date to show month style
  public  dateConversionMonth(date:any){
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dateArr=date.split("/");
        const month = months[dateArr[0]];
        return dateArr[1]+" "+month+" "+dateArr[2]
    }
    elementGet(elementId:any){
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
   public setJsonValue(json:any,key:any,value:any){
      var currentJson=json;
      currentJson[key]=value;
      return currentJson;
    }
   public sendAlert(error:any){
      alert(error);
    }
    public setAttributeValue(element:any,attribute:any,value:any){
      document.getElementById(element)?.setAttribute(attribute,value);
    }
    
     
}
export default Util;