export type props={
    label:string,
    type:string,
    name:string,
    rows:number,
    required:boolean,
    onChange:any,
    warning:string,
    value:any,
    size:any,
}
const defaultValue={
    required:false,
    rows:3,
    value:""
};