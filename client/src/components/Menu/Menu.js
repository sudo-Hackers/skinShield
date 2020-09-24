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
            
            <div className="Page">
            <div className="Menu">
                
                    
                <div className="Doc">
              <Card className="bg-dark text-white">
  <Card.Img className="Docc" src="https://i1.wp.com/blog.petrieflom.law.harvard.edu/wp-content/uploads/2019/03/doctor_patient_care-e1588703720335.jpg?resize=750%2C410&ssl=1" alt="Card image" />
  <Card.ImgOverlay className="Docc" style={{backgroundColor : "rgba(0,0,0,0.67)" }}>
    <Card.Title>SkinSheild-For your skin!!!</Card.Title>
    <Card.Text>
            We care for your skin.
    </Card.Text>
    <Card.Text>
            Just few steps towards your first trial steps!!
    </Card.Text>
  </Card.ImgOverlay>
</Card>
            
               
            </div>
            
            </div>
            <Cards/>
            </div>
            
        );
    }
}

export default Menu;