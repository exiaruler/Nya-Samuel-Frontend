import ishowmeat from '../assets/ishowmeat.jpg'
export default function error(){
    return(
        <div className="CentreText">
            <h1>404 not found :(</h1>
            <img src={ishowmeat} alt={"ishowspeed"} width={400} height={400}/>
        </div>
    )
}