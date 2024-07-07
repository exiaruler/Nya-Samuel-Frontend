import Projects from '../pages/projects/projects';
import ProjectRecord from '../pages/projects/projectRecord';
import Error from '../pages/error';
import Home from '../pages/home';
import Navbar from './navbar';
import LinkedIn from '../assets/LI-In-Bug.png';
import GitHub from '../assets/github-mark.png';
import Form from '../pages/formGen/form';
import Util from '../base/Util';
import Login from '../pages/user/login';
import testBed from '../pages/user/dev/testBed';
export default class navigation extends Util{
    // navbar/layout
    layout=Navbar;
    
    // external url outside website
    public externalLinks=[
        {
        "url":"https://www.linkedin.com/in/samuel-li-34ba34169/",
        "alt":"linkedIn",
        "image":LinkedIn,
        "status":true,
        "width":30,
        "height":25
        },
        {"url":"https://github.com/exiaruler",
        "alt":"GitHub",
        "image":GitHub,
        "status":true,
        "width":30,
        "height":28
        }
    ].filter((link)=>link.status===true);
    // pages access by logged in users
    public protectedRoutes=[
        {"component":testBed,
            "module":"user",
            "url":"/testbed",
            "name":"Test",
            "path":"/testbed",
            "enable":true,
            "index":false,
            "show":this.checkEnv()
        },
    ].filter((route)=>route.enable===true);
    // pages access for login
    public accessRoutes=[
        {"component":Login,
            "module":"user",
            "url":"/login",
            "name":"Login",
            "path":"login",
            "enable":true,
            "index":false,
            "show":false
        }
    ].filter((route)=>route.enable===true);

    header={
        "apikey":this.getApiKey()
    };
    // validate through GuardWrapper
    public routesParam=[
        {
        "component":ProjectRecord,
        "module":"project",
        "url":"/project/:id",
        "name":"Projects Record",
        "path":"/project/:id",
        "enable":true,
        "index":false,
        "show":false,
        "guard":{
            "api":this.getApiUrl()+"/project/get-project/",
            "config":{
                headers:this.header}
        }
        },
    ];
    
    public formRoute=[
        {
        "component":Form,
        "module":"formgen",
        "url":"/form/:formId/:id",
        "name":"Form Record",
        "path":"/form/:formId/:id",
        "enable":true,
        "index":false,
        "show":false,
        "guard":{
            "api":this.getApiUrl()+"/form/get-form/",
            "config":{headers:this.header,credentials: 'include'}
        }
        }
    ].filter((route)=>route.enable===true);
    // users ONLY
    public formLinks=[
        {
            "component":Form,
            "module":"formgen",
            "url":"/form/project/0",
            "name":"Add Project",
            "path":"/form/project/0",
            "enable":true,
            "index":false,
            "show":true,
            "guard":{
                "api":this.getApiUrl()+"/form/get-form/",
                "config":{headers:this.header,credentials: 'include'}
            }
            }
    ].filter((route)=>route.enable===true);
    // public routes
    public routes=[
        {"component":Home,
        "module":"nec",
        "url":"",
        "name":"Home",
        "path":"",
        "index":true,
        "enable":false,
        "show":true,
        },
        {"component":Projects,
        "module":"project",
        "url":"/projects",
        "name":"Projects",
        "path":"projects",
        "enable":true,
        "index":false,
        "show":true},
        {"component":Error,
        "module":"nec",
        "url":"",
        "name":"",
        "path":"*",
        "enable":true,
        "index":false,
        "show":false},
        {"component":Login,
        "module":"user",
        "url":"/login",
        "name":"Login",
        "path":"login",
        "enable":false,
        "index":false,
        "show":false
        },
    ];
    // error page
    error=Error;
    
} 