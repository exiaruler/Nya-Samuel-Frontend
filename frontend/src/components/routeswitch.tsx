import {  Routes, Route } from "react-router-dom";
import navigation from "./navigation";
import GuardWrapper from "./GuardWrapper";
import GuardWrapperForm from "./formGenComponents/GuardWrapperForm";
import GuardAuthorise from "./GuardAuthorise";
export default function routeswtich(){
    var nav=new navigation();
    var routes=[];
    var protectedRoutes=[];
    var paramRoutes: any[]=[];
    var formRoute=nav.formRoute;
    // home
    const home={element:nav.routes[0].component};
    // layout
    routes.push({element:nav.layout,path:"/"});
    for(var i in nav.routes){
        var rou=nav.routes[i];
        var route={element:rou.component,path:rou.path,index:rou.index};
        if(rou.enable){
            routes.push(route);
        }
    }
    paramRoutes=nav.routesParam.filter((route)=>route.enable===true);
    return(
        <div>
            <Routes>
                <Route index element={<home.element/>}/>
                {
                    // regular page routes
                    routes.map(route=>(
                        <Route element={<route.element/>} path={route.path} />
                     
                    ))
                }
                {
                    // record routes
                    paramRoutes.map(route=>(
                        <Route element={(
                            <GuardWrapper api={route.guard.api} config={route.guard.config} component={route.component}>
                            <route.component/>
                            </GuardWrapper>
                        )}
                        path={route.path}/>
                    ))
                }
                
                {
                    // form routes
                    formRoute.map(route=>(
                        <Route element={(
                            <GuardWrapperForm api={route.guard.api} config={route.guard.config} component={route.component}>
                            <route.component/>
                            </GuardWrapperForm>
                        )}
                        path={route.path}/>
                    ))
                }
            </Routes>
        </div>
    );
}