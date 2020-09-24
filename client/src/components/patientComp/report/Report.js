import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Photo from './Photo';

const Report = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
   
    useEffect(() => {
        const options = {
            url: `${process.env.REACT_APP_LINK}/api/patient/photos`,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          };
        Axios(options).then(res => {
            console.log(res.data);
            setPhotos(res.data);
            if(photos.length> 0)
                setIsLoading(true);
        }).catch(err => console.log(err));
    },[]);

    return (
        <div>
            {isLoading ? (
                <div>Loading..........</div>
            ):(photos.map(photo => <Photo key={photo._id} id={photo._id} />))}
        </div>
    )
}

export default Report;