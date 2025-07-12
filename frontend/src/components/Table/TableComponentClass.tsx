import { Component, ReactNode } from "react";
import Table from 'react-bootstrap/Table';
import checked from "../assets/checked.png";
import { Image } from "react-bootstrap";
type Props={
    id?:string;
    width?:any,
    rowSelect?:boolean;
    children?:Array<ReactNode>;
    results:Array<Object>;
    others?:any;
    idKey:string;
    onClick?:CallableFunction;
    onDoubleClick?:CallableFunction;
}
interface State{
    selectedRow:number;
    selectRowRec:any;
    rowSelect:boolean;
}

export default class TableComponentClass extends Component<Props,State>{
    width='';
    idKey='';
    others=this.props.others||'';
    constructor(props:Props) {
            super(props);
            this.state = {
                selectedRow:-1,
                selectRowRec:null,
                rowSelect:false
            };
    }
    componentDidMount(): void {
        if(this.props.rowSelect){
            this.setState({...this.state,rowSelect:this.props.rowSelect})
        }
    }
    valueBoolean(value:any){
        return value === false || value === true;
    }
    print(json:any,key:string,indexKey:number,size?:any){
        let value=json[key];
        let id=json[this.idKey];
        let element=<td key={id}  style={{
            //width:size,
            backgroundColor: this.state.selectedRow === indexKey ? "#D3D3D3" : ""
          }} className={ this.state.selectedRow === indexKey ? "TableRowSelect":""}>{value}</td>;
        if(this.valueBoolean(value)){
            element=<td key={id}  style={{
                //width:size,
                backgroundColor: this.state.selectedRow === indexKey ? "#D3D3D3" : ""
              }} className={this.state.selectedRow === indexKey ? "TableRowSelect":""}>
            <Image src={checked} alt="Checked" width={"30xpx"} height={"30px"}/>
              </td>;
        }
        return element;
        
    }
    selectRow(rec:any,key:number){
        if(this.state.rowSelect){
            this.setState({...this.state,selectedRow:key,selectRowRec:rec})
            if(this.props.onClick){
                this.props.onClick(rec);
            }
        }
    }
    returnRow(){
        return this.state.selectRowRec;
    }
    returnRowIndex(){
        return this.state.selectedRow;
    }
    doubleClick(){
        if(this.state.rowSelect){
            if(this.props.onDoubleClick){
                this.props.onDoubleClick();
            }
        }
    }
    render(){
        return (
        <Table hover={this.state.rowSelect} bordered  {...this.others} width={this.width} responsive={"md"} size={"sm"} id={this.props.id} >
        <thead>
        <tr>
        {
            this.props.children
        }
        </tr>
        </thead>
        <tbody>
        {
            this.props.results.map((rec:Object,index)=>(
                <tr onClick={()=>this.selectRow(rec,index)} onDoubleClick={()=>this.doubleClick()}>
                {
                    this.props.children?.map((ele:any)=>(
                        this.print(rec,ele.key,index,ele.props.size)
                    ))
                }
                </tr>
            ))
        }
        {
        this.props.results.length===0?
            <tr>
                <td colSpan={this.props.children?.length} style={{textAlign:'center'}}>No results avaliable</td>
            </tr>
        :null
        }
        </tbody>
        </Table>
        );
    }
}