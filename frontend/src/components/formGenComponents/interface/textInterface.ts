export interface Props{
    label:string;
    type:string;
    name?:string;
    rows:number;
    required?:boolean;
    readOnly?:boolean;
    disable?:boolean;
    onChange?:any;
    warning?:string;
    value:string;
    size?:any;
    md?:number;
    xs?:number;
}
export interface State{
    value:any
}