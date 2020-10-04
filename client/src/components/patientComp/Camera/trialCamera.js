import React, { useState } from 'react'
import { Button,Card } from 'react-bootstrap';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Axios from 'axios';
import Data from '../../../Assets/cancers (5).json';

function Came(props){
    const [click, setClick] = useState(false);
    const [uri, setUri] = useState(null);
    const [report, setReport] = useState(null);
    const [isSubmitted, setSubmit] = useState(false);

    function handleTakePhoto(dataUri) {
        // Do stuff with the photo...
        setUri(dataUri);
        setClick(true);
        console.log('Photo Taken!!');
    }

    function onPredict() {
        console.log(uri);
        const options = {
            url: "http://localhost:3001/api/patient/trialClick",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                uri: uri
            }
        };
        Axios(options).then(res => {
            console.log(res);
            setReport(res.data.data);
            setSubmit(true);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div style={{textAlign: 'center'}}>
            {click && <div><h2>Photo clicked</h2><img src={uri} />
                <div style={{marginTop: '10px'}}>
                    <Button onClick={onPredict}>Predict</Button>
                </div></div>}
            {!isSubmitted && !click && <Camera
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
            />}
            {isSubmitted && 
            <Card style={{marginTop: '20px' , textAlign: 'center'}}>
            <Card.Title style={{fontWeight: 'bold' , fontSize: '30px', color: 'blue'}}>Your Report </Card.Title>
            <Card.Text>You are diagonsed with <b>{report} </b> type of cancer.</Card.Text>
            <Card.Text style={{fontWeight: 'bold' , fontSize: '30px', color: 'blue'}}>Treatment or Prevention Steps</Card.Text>
            {
  
              Data[report].map((d) => {
                return(
                <Card.Text>
                  <ul type="circle">
                    <li>
                      {d}
                    </li>
                  </ul>
                  
                </Card.Text>
                );
              })
            }
            </Card>}
        </div>
    )
}

export default Came;
