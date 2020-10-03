import React, { Component } from 'react';
import {Card,Form,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Axios from 'axios';

import './DiscussionForums.css';

class DiscussionForums extends Component{
    constructor(props){
        super(props);
        this.state = {
            blog : ''
        }
    }

    componentDidMount () {
        const options = {
            url: `${process.env.REACT_APP_LINK}/api/patient/getForum`,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          };
          Axios(options).then((res) => {
            console.log(res.data);
          });
    }

    onChangeHandler = e => {
        this.setState({blog : e.target.value});
    }

    submitHandler(e){
        e.preventDefault();
        let patient = {...this.props.profileData}
        const options = {
            url: "http://localhost:3001/api/patient/saveForum",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                author: patient.name,
                blog : this.state.blog
            }
        };
        Axios(options).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    
    }
    render(){
        return(
            <div  className="DiscussF">
                <Card style={{width: '50rem' ,textAlign:'center'}}>
    <Card.Img variant="top" src="https://i.pinimg.com/564x/f7/ca/a3/f7caa3860ee4c6ddfa9f18b8939d6cd6.jpg" style={{height: '35vh'}}  />
    <Card.Body>
      <Card.Text>
            Want to share your experiance with skin Cancer...Go on!!!!
      </Card.Text>
      <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Your Blog</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Button variant="outline-info" style={{width: '40%' , borderRadius : '20px'}} onClick={this.submitHandler}>SUBMIT</Button>
      </Form>
    </Card.Body>
  </Card>
            </div>
        );
    }
}

let mapStateToProps = function mapStateToProps(state) {
    return {
        profileData : state.patient.patientProfile
    }
}

export default connect(mapStateToProps)(DiscussionForums);