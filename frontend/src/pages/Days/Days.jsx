import { Link } from 'react-router-dom'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios.js';
import { fetchDays } from '../../redux/slices/days.js';
import Day from '../../components/Day/Day.jsx';
import Header from '../../components/Header/Header.jsx';
import './Days.css'

const Days = () => {

    const dispatch = useDispatch();
    const { days } = useSelector((state) => state.days);
    
    const isDaysLoading = days.status == 'loading';

    useEffect(() => {
        dispatch(fetchDays());
    }, []);

    return(
        <>
            <Header/>
            <div className='days'>
                {(isDaysLoading ? [...Array(5)] : days.items.data).map((obj, index) => isDaysLoading ? (<h1>Loading</h1>) : (
                    <>
                        <Day id={obj._id} text={obj.text} avatarURL={obj.avatarUrl}/>
                    </>      
                ))};
            </div>
        </>
    )
};

export default Days;