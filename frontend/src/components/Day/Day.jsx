import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

import picture from '../../../../backend/uploads/ghoul.jpg'
import Header from '../Header/Header';


function Day(props) {
  console.log(props);

  let dayId = props.id;

  return (

    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.avatarURL ? props.avatarURL : 'https://www.solidbackgrounds.com/images/3840x2160/3840x2160-white-solid-color-background.jpg'} />
        <Card.Body>
          <Card.Title>тут будет дата наверное</Card.Title>
          <Card.Text>
            {props.text}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
    //вместо этого наверное надо сделать кнопку-картинку кликабельную
    //которая будет перебрасывать на страницу(или все же модальное окно) с конкретно этим днем 
    //и по бокам типа стрелочки для быстрого перелистывания
  );
}

export default Day;