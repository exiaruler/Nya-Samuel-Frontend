<<<<<<< HEAD
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const TableBody=forwardRef(function TableBody(props:any,ref){
    var keys=props.keys;
    const bodyRef:any=useRef();
    let records:Array<JSON>=[];
    var idKey=props.idKey;
    let [selectedRow, setSelectedRow] = useState(-1);
    records=props.records;
    const print=(json:any,key:any,indexKey:number)=>{
        let size=0;
        let name=key.key;
        size=key.size;
        let value=json[name];
        let id=json[idKey];
        return <td key={id} colSpan={size} style={{
            backgroundColor: selectedRow === indexKey ? "#D3D3D3" : ""
          }} className={selectedRow === indexKey ? "TableRowSelect":""}>{value}</td>;
    }
    const selectRow=(rec:any,key:number)=>{
        setSelectedRow(key);
        if(props.onClick){
            props.onClick(rec);
        }
    }
    const doubleClick=()=>{
        if(props.onDoubleClick){
            props.onDoubleClick();
        }
    }
    useImperativeHandle(ref,()=>{
        return {
            selectRow,
        }
      },[]);
    
    return(
    <tbody ref={bodyRef}>
    {
        records.map((record:any,index:number)=>(
            <tr  onClick={()=>selectRow(record,index)} onDoubleClick={doubleClick}
            >
            {
                keys.map((key:JSON)=>(
                print(record,key,index)
                ))
            }
            </tr>
        ))
    }
    </tbody>
    );
});
export default TableBody;
=======
import { Component } from "react";
export type props={
    value:string,
    json:Array<JSON>,
    keys:Array<string>
}
// table body component
export default class TableBody extends Component<props>{
    private valueKey="";
    private showId=false;
    public keys=[];
    componentDidMount(): void {
        this.valueKey=this.props.value;

    }
    
    render(){
        return(
            <tbody>
            {
                this.props.json.map(col=>(
                    <tr >
                    <th hidden={!this.showId}>{}</th>
                    
                    </tr>
                ))

            }
            </tbody>
        );
    }
}
>>>>>>> 01d730920e6d6e810cca5b018b43ce282aa2a730
