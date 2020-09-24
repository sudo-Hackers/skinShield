import React from 'react';
import { Card } from 'react-bootstrap';

const Photo = ({ id }) => {
  return (
    <Card className="photo">
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_LINK}/api/patient/photos/${id}`}
        alt="Photo"
      />
    </Card>
  );
};

export default Photo;