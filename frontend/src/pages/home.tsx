import React from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function home(){
  
    return (
        <div className="App">
        
          <Row>
          <Col id="Col1"></Col>
            <Col id="Col2">
            <div className='CentreText'>
            <h1>Welcome to my world!</h1>
            <p>Feel free to explore</p>
            </div>
            
            </Col>
            <Col id="Col3"></Col>
          </Row>
       
   
        </div>
      );
}