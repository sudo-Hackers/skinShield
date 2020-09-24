import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
  setPatientProfile,
  setMedicines,

} from '../../Redux/Patient/Patient.action';
import './Pdashboard.css';
import { Form, Card, Button } from 'react-bootstrap';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  fadeIn: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}
class Pdashboard extends Component {
  constructor() {
    super();
    this.state = {
      fle: null,
      report: false,
      isSubmitted: false,
      isError: false
    }
  }

  componentDidMount() {
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/getProfile`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    Axios(options).then((res) => {
      console.log(res.data);
      console.log(this.props.patientprofile);

      this.props.setPatientProfile(res.data.profile);

      let profiles = { ...res.data.profile };
      console.log(profiles.medicines);

      this.props.setMedicines(profiles.medicines);
      console.log(res.data.monitorData);
    });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    let patient = { ...this.props.patientProfile };
    const photoForm = new FormData();
    photoForm.append('photo', this.state.fle);
    console.log(this.state.fle);
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/photos/`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      data: photoForm
    };
    Axios(options).then((res) => {
      console.log(res);
      this.setState({ isSubmitted: true });
    }).catch(err => {
      console.log(err);
      this.setState({isError: true});
    });
  }


  render() {
    var redirect = null;
    if (this.state.report) {
      redirect = <Redirect to="/report" />
    }
    let patient = { ...this.props.patientprofile };
    return (
      <div>
        <StyleRoot>
          <div className="dasPat" style={styles.fadeIn}>
            <div className="Dascard">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://i.pinimg.com/564x/b3/74/10/b37410384d879643d85b390cdb10c7d1.jpg" />
                <Card.Body>
                  <Card.Title>Your Breif Records</Card.Title>
                  <Card.Text>
                    Hello , {patient.name} you are suffering from {patient.disease} and some of the medicine you are intaking are
                {
                      this.props.medicines.map((med) => {
                        return (
                          <Card.Text>{med}{' '}</Card.Text>
                        );

                      })
                    }
                Your weight is {patient.weight}.
              </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              {this.state.isSubmitted && (
                <p>
                  Photo uploaded successfully.
                </p>
              )}
              {this.state.isError && (
                <p>Error occured!</p>
              )}
              <Form
                onSubmit={this.onSubmitHandler}
                className="upload-form"
              >
                <Form.Group>
                  <Form.Label>Choose photo to upload</Form.Label>
                  <Form.Control type="file" name="files" onChange={(e) => { this.setState({ fle: e.target.files[0] }) }} />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className={`${!this.state.fle ? 'disabled submit-btn' : 'submit-btn'}`}
                  disabled={this.state.fle ? false : true}
                >
                  Upload
        </Button>
              </Form>
            </div>
            <div>
              <Button onClick={() => this.setState({ report: true })}>View past Report</Button>
            </div>
          </div>
        </StyleRoot>
        {redirect}
      </div>
    );
  }
}

let mapStateToProps = function mapStateToProps(state) {
  return {
    medicines: state.patient.medicines,
    patientprofile: state.patient.patientProfile
  };
}

const mapDispatchToProps = (dispatch) => ({
  setPatientProfile: (patientprofile) =>
    dispatch(setPatientProfile(patientprofile)),
  setMedicines: (medicines) => dispatch(setMedicines(medicines))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pdashboard);
