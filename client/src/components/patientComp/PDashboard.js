import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
  setPatientProfile,
  setMedicines,

} from '../../Redux/Patient/Patient.action';
import './Pdashboard.css';
import { Form, Card, Button , Alert} from 'react-bootstrap';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Data from '../../Assets/cancers (5).json';


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
      clickReport: false,
      isSubmitted: false,
      isError: false,
      model: null,
      imageURL: null,
      showImage: false,
      showReport: false,
      report: null,
      captureImage: false,
      discuss: false
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



  uploadHandler = (e) => {
    e.preventDefault();
    const url = URL.createObjectURL(this.state.fle);
    console.log(url);
    this.setState({ imageURL: url });
    this.setState({ showImage: true });
  }


  onSubmitPredict = (e) => {
    e.preventDefault();
    const photoForm = new FormData();
    photoForm.append('photo', this.state.fle);
    console.log(photoForm);
    console.log(this.state.fle);
    const options = {
      url: `${process.env.REACT_APP_LINK}/api/patient/photos`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      data: photoForm
    };
    Axios(options).then((res) => {
      console.log(res);
      this.setState({ report: res.data.data.report });
      this.setState({ isSubmitted: true, showImage: false, showReport: true });
    }).catch(err => {
      console.log(err);
      this.setState({ isError: true });
    });
  }


  render() {
    var redirect = null;
    var redirect2 = null;
    var redirectD= null;
    if(this.state.discuss){
      redirectD = <Redirect to="/discussionForums"/>
    }
    if (this.state.clickReport) {
      redirect = <Redirect to="/report" />
    }
    if(this.state.captureImage){
      redirect2 = <Redirect to="/camera" />;
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
                    Hello , {patient.name}
              </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div style={{textAlign: 'center' , transform: 'translateX(100px)'}}> 
        <Card className="text-center">

          <Card.Body>

            {this.state.isSubmitted && (
              <Card.Text>
                Photo uploaded successfully.
              </Card.Text>


            )}
            {this.state.isError && (
              <Card.Text>
                error ocurred
              </Card.Text>
            )}
            <Form
              onSubmit={this.state.showImage ? this.onSubmitPredict : this.uploadHandler}
              className="upload-form"
            >
              {!this.state.showImage &&
                <Form.File 
                id="custom-file"
                label="Select a File"
                name="files"
                onChange={(e) => { this.setState({ fle: e.target.files[0] }) }} 
                custom
                style={{marginBottom: '10px'}}
              >
                </Form.File>}

              {this.state.showImage && <img src={this.state.imageURL} alt="upload-preview" height="200" width="200" style={{padding: '10px'}}/>}
              <Button
                variant="primary"
                type="submit"
                
                className={`${!this.state.fle ? 'disabled submit-btn' : 'submit-btn'}`}
                disabled={this.state.fle ? false : true}
              >
                {this.state.showImage ? "Predict" : "Upload"}
              </Button>
            </Form>
            <div style={{padding: '10px'}}>
              <h2 style={{color: '#11455B',fontSize:'28px',fontFamily: 'Kaushan Script, cursive'}}>OR</h2>
            <Alert variant="info">
        Take picture and zoom it to the spot which has to be detected!!
  </Alert>
              <Button onClick={() => this.setState({ captureImage: true })}>
                <AddAPhotoIcon />
              </Button>

            </div>
         

          </Card.Body>
        </Card>
        {this.state.showReport &&
        <Card style={{marginTop: '20px' , textAlign: 'center'}}>
          <Card.Title>Your Report </Card.Title>
          <Card.Text>You are detected to have {this.state.report} type of cancer.</Card.Text>
          <Card.Text style={{fontWeight: 'bold'}}>Treatment or Prevention Steps</Card.Text>
          {
            Data[this.state.report].map((d) => {
              return(
              <Card.Text>
                {d}
              </Card.Text>
              );
            })
          }
          </Card>}
          <Button  style={{marginTop: '10px' }} onClick={() => this.setState({ clickReport: true })}>View past Report</Button>
      </div>
            <div className="Discussion">
            <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://i.pinimg.com/564x/88/9b/b5/889bb583679d9f4fd644beedccaf81c9.jpg" />
  <Card.Body>
    <Card.Title>Discussion forums</Card.Title>
    <Card.Text>
      Share your experiances and read people's experiance regarding this disease...
    </Card.Text>
    <Button variant="primary" onClick={() => this.setState({discuss : true})}>Read blogs!!!</Button>
  </Card.Body>
</Card>
            </div>
          </div>
        </StyleRoot>
        {redirect}
        {redirect2}
        {redirectD}
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
