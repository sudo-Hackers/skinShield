import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Axios from 'axios';

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
            {isSubmitted && <div><h2>Your Report here!</h2><h3>{report}</h3></div>}
        </div>
    )
}

export default Came;
