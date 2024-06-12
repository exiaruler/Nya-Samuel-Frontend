import { Component } from 'react';
import { CardText } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import gitlogo from './assets/github-mark.png';
import { Link } from 'react-router-dom';
//import props from './../../base/interfaces/project';

type props={
  id:number
  name:string,
  description:string,
  url:any
}

type State = {
  url:boolean
};
export default class ProjectCard extends Component<props,State>{
  
    private id=this.props.id;
    private disableStyle='';
    constructor(props:any) {
        super(props);
        this.state = {
          url:this.showGitLogo(this.props.url)
        };
        this.disableLink();
    }
    
    private showGitLogo(url:String){
      if(url!==""){
        return true;
      }else return false;
    }
    private disableLink(){
      const disable='disabled-link';
      if(this.id===0){
        this.disableStyle=disable;
      }

    }
    //style={{ width: '18rem' }}
    render(){
        return (
        <div>
        <Card>
        <Card.Body>
        <Link to={'/project/'+this.id} className={this.disableStyle}>
        <Card.Title as="h4">{this.props.name}</Card.Title>
        <CardText>{this.props.description}</CardText>
        </Link>
        <div>
          {this.state.url?
          <Card.Link href={this.props.url}><img src={gitlogo} height={30} width={30} alt="Repistory"/></Card.Link>
        :null}
        </div>
        
        </Card.Body>
        
        </Card>
        </div>);
    }
}