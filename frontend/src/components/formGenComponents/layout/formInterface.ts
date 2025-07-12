export interface FormInterface{
  form?:any;
  externalUrl?:string,
  record?:any;
  entry?:Boolean;
  clearHandle?:CallableFunction;
  submitHandle?:CallableFunction;
  clearAction?:Boolean;
  id:string;
  formId:string;
  valueKey:string;
  onClick?:CallableFunction;
}