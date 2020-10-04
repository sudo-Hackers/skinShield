import React,{Component} from 'react';
import {connect} from 'react-redux';
import Photo from './Photo';

import {Card,Button} from 'react-bootstrap';
import { Redirect } from 'react-router';

class PatientMonitored extends Component {
    constructor(props){
        super(props);
        this.state={
            redirect : false
        }
    }

        render(){
            let redirect = false;
            if(this.state.redirect){
                redirect = <Redirect to="/" />
            }
            return(
                
                <div style={{paddingTop: '60px'}}>
                    
                   {console.log(this.props.match.params.id)}
                    {
                        this.props.patient.map((pat) => {
                           
                            if(pat.profile._id === this.props.match.params.id){
                                return (
                                    <div>
                                        
                                <Card className="text-center">
                                <Card.Header>Patient's Self Monitored Report</Card.Header>
                                <Card.Body>
                                <Card.Title>{pat.profile.name}</Card.Title>
    
                                    {pat.monitor.length !== 0? <Card.Text>This are my predicted data.</Card.Text> : <Card.Text>Sorry!!Patient has not started monitoring!!</Card.Text>}
                                    {console.log(pat.monitor)}
                                    <div className="repo">
                                    {
                                        pat.monitor.map((photo) => {
                                            return(
                                            <Photo key={photo._id} id={photo.photoUrl} report={photo.report} date={photo.createdAt}/>
                                            );
                                        })
                                    }
                                    </div>
                                    <Button variant="primary" onClick = {()=> this.setState({redirect : true})}>Go To Dashboard</Button>
                                    </Card.Body>
                                     <Card.Footer className="text-muted">2 days ago</Card.Footer>
                                    </Card>
                                    {redirect}
                               
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            );
        }
    }


let mapStateToProps = function mapStateToProps(state) {
    return {
    patient : state.doctor.patientMonitored
    }
}

export default connect(mapStateToProps)(PatientMonitored);