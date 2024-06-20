export type props={
    label:string,
    type:string,
    name:string,
    rows:number,
    required:boolean,
    onChange:any,
    warning:string,
    value:string
}
const defaultValue={
    required:false,
    rows:3,
    value:""
};