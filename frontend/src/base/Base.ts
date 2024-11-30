// api domain and key
class Base{

  private apiURlBase=process.env.REACT_APP_API_URL||"http://localhost:8000/api";
  // dev key
  private apikey=process.env.REACT_APP_API_KEY||"S7fgxFOTKTK8aCjq";
  // js vanilla fetch
   public apiCallConfig(method:string,body=null){
      var config:any={
        method:method,
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json',
          "apikey":this.getApiKey()
        },
      };
      if(body!=null){
        config={
          method:method,
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
            "apikey":this.getApiKey()
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
}
export default Base;