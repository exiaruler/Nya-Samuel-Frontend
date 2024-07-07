import PasswordText from "../../../components/PasswordText";

// development for components
export default function testBed(){
    return(
        <div>
            <PasswordText label={"test"} type={""} name={""} rows={0} required={false} onChange={undefined} warning={""} value={""} size={undefined}/>
        </div>
    )
}