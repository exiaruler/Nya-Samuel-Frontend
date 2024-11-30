import Util from "../base/Util";

export class CommonAPI extends Util{
    public async getSetting(){
        try{
            const request=await fetch(this.getApiUrl()+"setting/get-setting",this.apiCallConfig("GET"));
            if(!request.ok){
                throw new Error('error happened');
            }
            var data=await request.json();
            return data;
        }catch(err){
            this.throwError(err);
        }
    }
}