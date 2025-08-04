import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import { selectIsAuth } from "../../redux/slices/auth";
import './Header.css'
import MainMenu from '../MainMenu/MainMenu';

const Header = () => {
    const isAuth = useSelector(selectIsAuth);


     return (  
        <>
            <header className="header">
                {isAuth ? (
                    <>
                        <Link to="/" className='linkH'>
                            <h1>
                                Home
                            </h1>
                        </Link>

                        <MainMenu className='dropdownMenu'/>
                    </>
                ): (
                    <>
                        <Link to="/" className='linkH'>
                            <h1>
                                Home
                            </h1>
                        </Link>
                        <div className='linkLR'>
                            <Link to='/login' className='link'>
                                Логин
                            </Link>
                            <Link to='/register' className='link'>
                                Регистрация
                            </Link>
                        </div>
                    </>
                )};
                
            </header>
        </>
    )

    //сделай зависимость от авторизации
    
}

export default Header;