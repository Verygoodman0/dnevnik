import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header.jsx';
import Year from '../../components/Year/Year.jsx';
import { selectIsAuth } from '../../redux/slices/auth.js';
import './Days.css';
import { Navigate } from 'react-router-dom';

const Days = () => {
    const isAuth = useSelector(selectIsAuth);

    if(!isAuth){
        return(
            <Navigate to='/'/>
        );
    }

    return(
        <>
            <Header/>
            <div>
                <Year/>
            </div>
        </>
    )
};

export default Days;