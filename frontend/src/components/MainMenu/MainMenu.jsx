import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useDispatch} from 'react-redux';

import {logout} from '../../redux/slices/auth.js'
import './MainMenu.css'

const MainMenu = () => {
    const dispatch = useDispatch();
    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')){
            dispatch(logout());
            window.localStorage.removeItem('token');
        };
        
    };
    return (
        <span className='dropdownMenu'>
            <DropdownButton id="dropdown-basic-button" title='Меню'>
                {/* <Image src={props} roundedCircle /> */}
                <Dropdown.Item href="#/action-1">Личный кабинет</Dropdown.Item>
                {/* <Dropdown.Item onClick={}"> Friends </Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item onClick={onClickLogout}>Exit</Dropdown.Item>
            </DropdownButton>
        </span>
  );
}

export default MainMenu;