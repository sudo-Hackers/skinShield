import React from 'react'; 
import {Card} from 'react-bootstrap';
import FavoriteIcon from '@material-ui/icons/Favorite';

const posts = (props) => {
    return (
        <div style={{textAlign: 'center'}}>
              <Card border="info" style={{ width: '18rem' }}>
    <Card.Body>
    
      <Card.Text>
            {props.blog}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
        Written with <FavoriteIcon color="secondary" fontSize= "small"/> by {props.author}
    </Card.Footer>
    
       
 
  </Card>
        </div>
    );
}

export default posts;