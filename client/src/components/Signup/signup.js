import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DocSignup from '../signupForm/docSignup';
import PatientSignup from '../signupForm/patientSignup';
import "./signup.css";
import {FormControlLabel,Switch} from '@material-ui/core';

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docRedirect: false,
           
        }
    }


    render() {
        let redirect = null;
        if (this.state.docRedirect) {
           redirect = <DocSignup onSignup = {this.props.onSignupDoc}/>
        }
       else{
            redirect = <PatientSignup onSignup = {this.props.onSignupPatient}/>
       }
        return (
            <div className="Sign-up">
                 <h2 style={{color: '#11455B',fontSize:'28px',fontFamily: 'Kaushan Script, cursive'}}>Sign-up as a Doctor?</h2>
                <FormControlLabel
                    control={<Switch size="normal" onChange={()=> this.setState({docRedirect: !this.state.docRedirect})} />}
                />
                {redirect}
                </div>
        )
    }
}

export default signup;