import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios.js';
import { fetchDays } from '../../redux/slices/days.js';
import './Month.css'
import Day from '../Day/Day.jsx';

export default function Month(props) {
  const dispatch = useDispatch();
  const { days } = useSelector((state) => state.days);
  const userData = useSelector((state) => state.auth.data);

  const isDaysLoading = days.status == 'loading';

  useEffect(() => {
      dispatch(fetchDays());
  }, []);

  return (
    <div className='month_carousel'>
      <Carousel>
        {[
          "Январь",
          "февраль", 
          "март", 
          "апрель", 
          "май", 
          "июнь", 
          "июль",
          "август", 
          "сентябрь", 
          "октябрь", 
          "ноябрь", 
          "декабрь" 
        ].map((month) => (
          <Carousel.Item interval={1000000}>
            <img
              className="d-block w-100"
              src="https://avatars.mds.yandex.net/i?id=7fac920a7130245d9d762f8ec0aa922a_l-12367219-images-thumbs&n=13"
              alt="Image One"
            /> 
            <Carousel.Caption>
              <h3>{month} {props.yearInput}</h3>
            </Carousel.Caption>
            <Carousel.Caption>
              {/* вот сюда надо уже добавлять все дни месяца и сделать им отдельный className */}
              <div className='days'>
                {(isDaysLoading ? [...Array(30)] : [...Array(30)]).map((obj,index) => 
                  isDaysLoading ? (
                    <Day isBlank={true}/>
                  ) : (
                    <Day isBlank={false} year={props.yearInput} month={month} index={index}/>
                  ),
                )};
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))};  
        </Carousel>
    </div>
  );
}

              // <div className='days'>
              //   {(isDaysLoading ? [...Array(5)] : days.items.data).map((obj,index) => 
              //     isDaysLoading ? (
              //       <Day/>
              //     ) : (
              //       <Day/>
              //     ),
              //   )};
              // </div>