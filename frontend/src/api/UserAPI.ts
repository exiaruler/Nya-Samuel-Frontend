import Util from "../base/Util";
import axios from "axios";
export default class UserAPI extends Util{
    private base="/user/";
    private header={
        'Content-Type': 'application/json',
        "apikey":this.getApiKey()
    };
    public async login(json:any){
        try{
            const request=await fetch(this.getApiUrl()+this.base+"login",
            {   method:"POST",
                body:JSON.stringify(json),
                headers:this.header,
                credentials: 'include'
            });
            if(!request.ok){
                throw new Error('error happened');
            }
            const response=request.json();
            return response;
        }catch(err:any){
            this.throwError(err);
        }
    }

    public async checkLogin(){
        try{
            var login=false;
            const request=await fetch(this.getApiUrl()+this.base+"auth",{
                method:"GET",
                headers:this.header,
                credentials: "include"
            });
            const response=request.status;
            if(response===200){
                login=true;
            }
            return login;
        }catch(err:any){
            this.throwError(err);
        }
    }
    public async userCreden(){
        try{
            var data=null;
            const request=await fetch(this.getApiUrl()+this.base+"user-det",{
                method:"GET",
                headers:this.header,
                credentials: "include"
            });
            if(request.ok){
                data= await request.json();
            }
            return data;
        }catch(err:any){
            this.throwError(err);
        }
    }
    
    public async logout(){
        try{
            let res=false;
            const request=await fetch(this.getApiUrl()+this.base+"logout",{
                method:"POST",
                headers:this.header,
                credentials: 'include'
            });
            if(request.ok){
                res=true;
            }
            return res;
        }catch(err:any){
            this.throwError(err);
        }
    }
}