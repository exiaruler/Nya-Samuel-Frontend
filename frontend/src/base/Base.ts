import CryptoJS from 'crypto-js';
// api domain and key
class Base{

  public originUrl=this.getOriginUrl();
  
  private apiURlBase=process.env.REACT_APP_API_URL||"http://localhost:8000/api";
  // dev key
  private apikey=process.env.REACT_APP_API_KEY||"S7fgxFOTKTK8aCjq";
  // encryption key
  public encryptKey:string=process.env.REACT_APP_API_ENCRYPTKEY||"";
  // js vanilla fetch
  public apiCallConfig(method:string,body:any=null){
      let date=new Date();
      var config:any={
        method:method,
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json',
          "apikey":this.getApiKey(),
          "datetime":date,
          "datestring":date.toDateString(),
          "timestring":date.toTimeString()
        },
      };
      if(body!=null){
        if(typeof body!='string'){
          body=JSON.stringify(body);
        }
        config={
          method:method,
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
            "apikey":this.getApiKey(),
            "datetime":date,
            "date":date.toDateString(),
            "time":date.toTimeString()
          },
          body:body
        };
      }
      return config;
    }
    public async serviceRequest(service:string,path:string,route:string,method:string,params:any=[],body:any=null){
      var url=this.getApiUrl()+"/service/api-call/"+service+"/"+path+"/"+route;
      var config=this.apiCallConfig(method,body);
      if(params.length>0){

      }
      const request=await fetch(url,config);
      return request;
    }
    public getOriginUrl(){
      var url='http://localhost:3000';
      if(typeof window !== 'undefined'){
        url=window.location.origin;
      }
      return url;
    }

    public checkEnv(){
      var result=false;
      if(this.apiURlBase==="http://localhost:8000/api"&&this.apikey==="S7fgxFOTKTK8aCjq") result=true;
      return result;
    }
    
    public getApiKey(){
      var key="";
      if(this.apikey!=undefined){
        key=this.apikey;
      }
      return key;
    }
    public getApiUrl(){
      var url="";
      if(this.apiURlBase!=undefined){
        url=this.apiURlBase;
      }
      return url;
    }
    
    public encryptValue(value:string){
      var encryption=value;
      if(this.encryptKey!=undefined&&this.encryptKey!=""){
        encryption=CryptoJS.AES.encrypt(value,this.encryptKey).toString();
      }
      return encryption;
    }
    public decryptValueToString(value:string){
      var convert=value;
      if(this.encryptKey!=undefined&&this.encryptKey!=""){
        const bytes=CryptoJS.AES.decrypt(value,this.encryptKey);
        convert = bytes.toString(CryptoJS.enc.Utf8);
      }
      return convert;
    }
    public generateEncryptKey(){
      var length=20;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
      
}
export default Base;