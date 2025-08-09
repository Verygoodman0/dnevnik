import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import './Home.css'
import Day from '../../components/Day/Day.jsx'
import { selectIsAuth } from '../../redux/slices/auth.js';
import { fetchDays } from '../../redux/slices/days.js';


const Home = () => {
    const isAuth = useSelector(selectIsAuth);

    const dispatch = useDispatch();
    const { days } = useSelector((state) => state.days);
    const userData = useSelector((state) => state.auth.data);

    const isDaysLoading = days.status == 'loading';

    useEffect(() => {
        dispatch(fetchDays());
    }, []);

    var months = [
          "январь",
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
        ]

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();

    let isBlank = true;
    let dayId;
    let avatarUrl;

    if (!isDaysLoading){
        for (let i = 0; i < days.items.length; i++) {
            if (days.items[i].year == yyyy && days.items[i].month == months[mm] && days.items[i].day == dd){
                isBlank = false;
                avatarUrl = days.items[i].avatarUrl;
                dayId = days.items[i]._id;
            }
        }
  }

    return(
        <>
            <Header/>
            {isAuth ? (
                <>
                    <Link to='/days' className='link_days'>
                        <h1>Other days</h1>
                    </Link>
                    <h3 className='or'>OR</h3>
                    <span className='today_box'>
                        <h1 className='today_text'>Tell about today!</h1>
                        <Day 
                            isBlank={isBlank} //надо получить значения поста с индексом сегодняшнего дня
                            isBig={true}
                            year={yyyy}
                            month={months[mm]}
                            index={dd}
                            dayId={dayId}
                            avatarUrl={avatarUrl} 
                        />
                    </span>
                </>
            ) : (
                <h1 className='or'>Необходима регистрация</h1>
            )}
        </>
    )
};

export default Home;