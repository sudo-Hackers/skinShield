import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./login.css";
import {Form} from 'react-bootstrap';
import { FormControlLabel , Switch} from '@material-ui/core';
import Doclogin from '../loginForm/docLogin';
import Patientlogin from '../loginForm/patientLogin';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            docRedirect: false
        }
    }

    render(){
        let redirect = null;
        if(this.state.docRedirect){
            redirect = <Doclogin onLogin = {this.props.onLoginDoctor}/>
        }
        else {
            redirect = <Patientlogin onLogin = {this.props.onLoginPatient}/>
        }
        return(
            <div style={{textAlign: 'center' , paddingTop: '80px' }}>
                {/*<div className="signup-buttons">
                    <div className="Doclogin">
                    <button onClick={this.onClick1}>Login as Doctor</button>
                    </div>
                    <div className="Patientlogin">
                    <button onClick={this.onClick2}>Login as Patient</button>
                    </div>
                </div>
        */}
                <h2 style={{color: '#11455B',fontSize:'28px',fontFamily: 'Kaushan Script, cursive'}}>Login as a Doctor?</h2>
                <FormControlLabel
                    control={<Switch size="small" onChange={()=> this.setState({docRedirect: !this.state.docRedirect})} />}
                />
                {redirect}
        </div>
        )
    }
}

export default Login;