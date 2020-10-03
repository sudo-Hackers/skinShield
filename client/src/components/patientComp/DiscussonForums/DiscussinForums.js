import React, { Component } from 'react';
import {Card,Form,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Axios from 'axios';
import {setBlogs} from '../../../Redux/Patient/Patient.action';
import Posts from './Posts';

import './DiscussionForums.css';


class DiscussionForums extends Component{
    constructor(props){
        super(props);
        this.state = {
            blog : '',
            name : '',
            blogs : []
        }
    }

    componentDidMount () {
        let patient = {...this.props.profileData}

        this.setState({name : patient.name})
        const options = {
            url: `${process.env.REACT_APP_LINK}/api/patient/getForum`,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          };
          Axios(options).then((res) => {
            this.setState({blogs : res.data.data});
          });

    }

    onChangeHandler = e => {
        this.setState({blog : e.target.value});

    }

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.name);
        var name = this.state.name;
        var blog = this.state.blog; 
        const options = {
            url: "http://localhost:3001/api/patient/saveForum",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                author: name,
                blog : blog
            }
        };
        console.log(options.data);
        Axios(options).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        this.setState (state => {
            return{
            blogs : [...state.blogs,options.data],
            blog : ""
            }
        })
       
    
    }
    render(){
        console.log(this.state.blogs);
        console.log(this.state.name);
        return(
            <div>
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
    <Form.Control as="textarea" rows="3" onChange={this.onChangeHandler} />
  </Form.Group>
  <Button variant="outline-info" style={{width: '40%' , borderRadius : '20px'}} onClick={this.submitHandler}>SUBMIT</Button>
      </Form>
    </Card.Body>
  </Card>
  </div>
            <div className="blogs">
                {
                    this.state.blogs.map((blog) => {
                        return(
                        <Posts author = {blog.author} blog = {blog.blog}/>
                        );
                    } )
                }
            </div>
            </div>
            
        );
    }
}

let mapStateToProps = function mapStateToProps(state) {
    return {
        profileData : state.patient.patientProfile
    }
}
 
const mapDispatchToProps = (dispatch) => ({
    setBlogs: (blog) => dispatch(setBlogs(blog)),
  });
export default connect(mapStateToProps,mapDispatchToProps)(DiscussionForums);