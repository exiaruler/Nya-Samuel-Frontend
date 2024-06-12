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
            const projectRequest=await fetch(request,this.apiCallConfig("GET"));
            if(!projectRequest.ok){
                throw new Error('error happened');
            }
            var data=await projectRequest.json();
            for(var i=0; i<data.length; i++){
                var rec=data[i];
                var desc=this.cutOffString(rec.description,100," ....");
                data[i].description=desc;
            }
            return data;
        }catch(err){
            console.error('Oh shit something happened');
            throw err;
        }
    }
    public async getProject(id:any){
        const header={
            "apikey":this.getApiKey()
        };
        try{
            const request=await fetch(this.getApiUrl()+this.base+"get-project/"+id,this.apiCallConfig("GET"));
            if(!request.ok){
                throw new Error('error happened');
            }
            var data=await request.json();
            return data;
        }catch(err){
            console.error('Oh shit something happened');
            throw err;
        }
    }
}