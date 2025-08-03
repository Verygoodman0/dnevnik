import { Link } from 'react-router-dom'

import Header from '../../components/Header/Header';
import './Home.css'

const Home = () => {
    return(
        <>
            <Header/>
            <div className='vremenno'>
                <Link to='/'>
                    Домой
                </Link>
                <Link to='/days'>
                    список
                </Link>
            </div>
        </>
    )
};

export default Home;