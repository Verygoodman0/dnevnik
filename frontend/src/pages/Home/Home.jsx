import { Link } from 'react-router-dom'
import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import axios from '../../axios.js';
import './Home.css'
import { fetchDays } from '../../redux/slices/days.js';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDays())
    }, []);

    return(
        <>
            <Header/>
            <div className='vremenno'>
                <Link to='/'>
                    Домой
                </Link>
                <Link to='/login'>
                    Логин
                </Link>
                <Link to='/register'>
                    Регистрация
                </Link>
            </div>
            
        </>
    )
};

export default Home;