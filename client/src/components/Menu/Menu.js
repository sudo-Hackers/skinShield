import React,{Component} from 'react';
import './Menu.css';
import { Redirect } from 'react-router';
import Cards from './Cards';
import {Card} from 'react-bootstrap';

 


class Menu extends Component {
    constructor(){
        super();
        this.state={
            redirect: false
        }
    }
    render(){
        let redirect = null;
        if(this.state.redirect){
            redirect=<Redirect to="/signup"/>
        }
        return(
            
            
            <div className="Menu">
                
                    
                <div className="Doc">
              {/*<Card className="bg-dark text-white">
  <Card.Img className="Docc" src="https://i.pinimg.com/564x/fb/d0/96/fbd0968077e81a9b6de9627ef9a5d884.jpg" style={{height: '130vh' , width: '1400px'}} alt="Card image" />
  <Card.ImgOverlay className="Docc" style={{backgroundColor : "rgba(0,0,0,0.67)" }}>
    <Card.Title style={{textAlign: 'right', color: '#6da6c7' , fontSize: '55px'}}>SkinSheild</Card.Title>
    <Card.Text>
            We care for your skin.
    </Card.Text>
  </Card.ImgOverlay>
        </Card>*/}
        <div style={{height:'80vh' , width: '100%', overflow:'hidden'}}>
            <h1>SkinSheild</h1>
        </div>
            
               
            </div>
            
            </div>
            
        );
    }
}

export default Menu;