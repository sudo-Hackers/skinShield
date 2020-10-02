import React, { Component } from 'react';
import {Form , Button, Card} from 'react-bootstrap';
import Axios from 'axios';


class Trialtest extends Component{
    constructor(){
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
        }
    }

    uploadHandler = (e) => {
        e.preventDefault();
        const url = URL.createObjectURL(this.state.fle);
        console.log(url);
        this.setState({ imageURL: url });
        this.setState({showImage: true});
      }
    
    
      onSubmitPredict = (e) => {
        e.preventDefault();
        const photoForm = new FormData();
        photoForm.append('photo', this.state.fle);
        console.log(photoForm);
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
        console.log(options.data);
        Axios(options).then((res) => {
          console.log(res);
          this.setState({report: res.data.report});
          this.setState({ isSubmitted: true, showImage: false, showReport: true});
        }).catch(err => {
          console.log(err);
          this.setState({ isError: true });
        });
      }
    

    render(){
        return(
            <div style={{padding: '80px'}}>
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
                {!this.state.showImage && <Form.Group>
                  <Form.Label>Choose photo to upload</Form.Label>
                  <Form.Control type="file" name="files" onChange={(e) => { this.setState({ fle: e.target.files[0] }) }} />
                </Form.Group>}

                {this.state.showImage && <img src={this.state.imageURL} alt="upload-preview" height="200" width="200"/>}
                <Button
                  variant="primary"
                  type="submit"
                  className={`${!this.state.fle ? 'disabled submit-btn' : 'submit-btn'}`}
                  disabled={this.state.fle ? false : true}
                >
                  {this.state.showImage ? "Predict" : "Upload"}
        </Button>
              </Form>
              {this.state.showReport && <Card.Text>your report here!
                  {this.state.report}</Card.Text>}
                
  </Card.Body>
</Card>
</div>
        );             
}
}




export default Trialtest;