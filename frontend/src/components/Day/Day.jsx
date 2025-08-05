import { Link } from 'react-router-dom'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import './Day.css'
import { fetchDays } from '../../redux/slices/days.js';
import DayModal from '../DayModal/DayModal';

function Day(props) {
  let isBlank = props.isBlank;
  let year = props.year;
  let month = props.month;
  let index = props.index;

  let avatarUrl = 'https://avatars.mds.yandex.net/i?id=be762b5da5905e8386cd9d044cd85f01_l-4881358-images-thumbs&n=13';
  let dayId;

  const dispatch = useDispatch();
  const { days } = useSelector((state) => state.days);
  const userData = useSelector((state) => state.auth.data);

  const isDaysLoading = days.status == 'loading';

  useEffect(() => {
      dispatch(fetchDays());
  }, []);

  if (!isDaysLoading){
    for (let i = 0; i < days.items.length; i++) {
      if (days.items[i].year == year && days.items[i].month == month && days.items[i].day == index){
        isBlank = false;
        avatarUrl = days.items[i].avatarUrl;
        dayId = days.items[i]._id;
      }
    }
  }

  return (
    <span className='day'>

        {/*  className='day_avatar' */}
          <DayModal 
            isBlank={isBlank} 
            avatarUrl={avatarUrl} 
            index={index}
            year={year}
            month={month}
            day={index}
            dayId={dayId}
          />
        


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