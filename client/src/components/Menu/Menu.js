import React,{Component} from 'react';
import './Menu.css';
import { Redirect } from 'react-router';
import Cards from './Cards';
import {Card,Button} from 'react-bootstrap';

 


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
            redirect=<Redirect to="/trialTest"/>
        }
        return(
            
            
            <div className="Menu">
                
                <div style={{height:'100vh' , width: '100%', overflow:'hidden', backgroundColor: 'rgba(76, 219, 240,0.5)'} }>
        <div style={{transform: 'translateX(250px) translateY(300px)'}}>
            <div  style={{display:'flex' , flexDirection: 'row'}}>
                        <h1 style={{color: '#1B5D78',fontSize:'78px',fontFamily: 'EB Garamond, serif'}}>Skin</h1><h1 style={{color:'white' ,fontSize:'78px',fontFamily: 'Dancing Script, cursive' }}>Sheild</h1>

                    </div>
                    <p style={{color: '#11455B',fontSize:'68px',fontFamily: 'Kaushan Script, cursive',paddingLeft:'60px'}}>For your skin</p>
                    </div>
                <div className="Doc">
                    
       
            <div className="Doccard">
        <Card border="primary" className="cardStyle" style={{ width: '23rem',float:'right', padding: '30px 0'}}>
    
    <Card.Body style={{fontSize: '23px'}}>
      <Card.Title style={{fontSize : '25px'}}>Get Started!!</Card.Title>
      <Card.Text>
      Worried about a spot or a mole on your skin...
Don't worry!! Get diagnosed with our trial test in one click.
      </Card.Text>
      <Button variant="primary" style={{borderRadius: '20px',width: '80%',fontSize : '23px'}} onClick={() => {this.setState({redirect: true})}}>Get Yout trial test!</Button>
    </Card.Body>
  </Card>
  </div>
        </div>
            {redirect}
               
            </div>
            
            </div>
            
        );
    }
}

export default Menu;