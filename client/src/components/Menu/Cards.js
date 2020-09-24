import React, { Component } from 'react';
import {Card,CardDeck} from 'react-bootstrap';
import './Menu.css';
import CallIcon from '@material-ui/icons/Call';
import Radium, {StyleRoot} from 'radium';
import { slideInRight } from 'react-animations';
 
const styles = {
  slideInRight: {
    animation: 'x 2.5s',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
  }
}

class Cards extends Component{

    render(){
        return(
          <StyleRoot>
            <div className="Home">
              <div style={styles.slideInRight}>
<CardDeck>
  <Card>
    <Card.Img variant="top" src="https://i.pinimg.com/564x/8d/cc/7d/8dcc7de6d866baf1a3228f91b26f0f96.jpg" />
    <Card.Body>
      <Card.Title>Weekly Monitoring</Card.Title>
      <Card.Text>
       It has become very important nowadays, to keep a daily track of the condition of your skin and you can keep records of all your improvements eventually. So, we have 
       brought the facility of monitoring yourself on a daily basis and monitor your health daily.  
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i.pinimg.com/564x/8d/7f/fc/8d7ffca11223041be9316fa1c497990a.jpg" />
    <Card.Body>
      <Card.Title>Virtual Prescription</Card.Title>
      <Card.Text>
        We have taken the doctor patient relation into a new way of interaction by facilitating virtual prescription with reminders for your 
        medicines and many more.
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i.pinimg.com/564x/5d/ff/f3/5dfff3e3fea7d3abf8fc723f3dc72193.jpg" />
    <Card.Body>
      <Card.Title>Panel of best doctors</Card.Title>
      <Card.Text>
        We have brought you the best doctors where you can choose your own doctor, get appointments from them and additionally they can even monitor your daily diets ,
        your health 24*7. You can have your video appointment as well for more convinient way of interaction.
      </Card.Text>
    </Card.Body>
  </Card>
</CardDeck>
            </div>
           
            </div>
            </StyleRoot>
        );
    }
}
export default Cards;