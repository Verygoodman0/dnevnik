import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

import picture from '../../../../backend/uploads/ghoul.jpg'
import Header from '../Header/Header';
import './Day.css'
import DayModal from '../DayModal/DayModal';

function Day(props) {
  //console.log(props);

  let dayId = props.id;

  return (
    <span className='day'>

        {/*  className='day_avatar' */}
          <DayModal> {props} </DayModal>
        


      {/* <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.avatarURL ? props.avatarURL : 'https://www.solidbackgrounds.com/images/3840x2160/3840x2160-white-solid-color-background.jpg'} />
        <Card.Body>
          <Card.Title>тут будет дата наверное</Card.Title>
          <Card.Text>
            {props.text}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card> */}
    </span>
    //вместо этого наверное надо сделать кнопку-картинку кликабельную
    //которая будет перебрасывать на страницу(или все же модальное окно) с конкретно этим днем 
    //и по бокам типа стрелочки для быстрого перелистывания
    //у каждого дня должна быть также переменная даты 
  );
}

export default Day;