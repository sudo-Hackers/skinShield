import React from 'react';
import { Card } from 'react-bootstrap';

const Photo = ({ id, report, date }) => {
  const url = `${process.env.REACT_APP_LINK}/${id}`;
  console.log(url);
  return (
    <Card className="photo" style={{width: '80%'}}>
      <Card.Img
        variant="top"
        src={url}
        alt="Photo"
      />
      <Card.Text>Cancer Type: {report}</Card.Text>
      <Card.Text>Date: {date}</Card.Text>
    </Card>
  );
};

export default Photo;