import Util from "../base/Util"

export default class ProjectAPI extends Util{
    api(): import("../base/interfaces/project").Project {
      throw new Error('Method not implemented.');
    }

    private base="/project/"
    // get a list of all projects
    public async getAllProjects(){
        const request=this.getApiUrl()+this.base+"get-all-project";
        try{
            var config={
                method:"GET",
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    apikey:this.getApiKey()
                }
            };
            const projectRequest=await fetch(request,this.apiCallConfig("GET"));
            if(!projectRequest.ok){
                throw new Error('error happened');
            }
            var data=await projectRequest.json();
            return data;
        }catch(err){
            this.throwError(err);
        }
    }
    public async getProject(id:any){
        try{
            const request=await fetch(this.getApiUrl()+this.base+"get-project/"+id,this.apiCallConfig("GET"));
            if(!request.ok){
                throw new Error('error happened');
            }
            var data=await request.json();
            return data;
        }catch(err){
            this.throwError(err);
        }
    }
    public async deleteProject(id:any){
        try{
            var config:any={
                method:'DELETE',
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    apikey:this.getApiKey()
                }
            };
            const request=await fetch(this.getApiUrl()+this.base+"delete-project/"+id,config);
            return await request;
        }catch(err){
            this.throwError(err);
        }
    }
}