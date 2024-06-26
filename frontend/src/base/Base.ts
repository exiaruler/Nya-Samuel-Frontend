// api domain and key
class Base{

  private apiURlBase=process.env.REACT_APP_API_URL||"http://localhost:8000/api";
  // dev key
  private apikey=process.env.REACT_APP_API_KEY||"S7fgxFOTKTK8aCjq";
  // js vanilla fetch
   public apiCallConfig(method:string){
      return{
        method:method,
        headers:{
          'Content-Type': 'application/json',
          "apikey":this.getApiKey()
        },
      };
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