import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import './WLogin.css'

function WLogin() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await dispatch(fetchAuth({
            'email': email,
            'password': password,
        }));

        if (!data.payload){
            return alert('Не удалось авторизоваться');
        };
        
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        };
  };

  

  if (isAuth) {
    return <Navigate to='/'/>;
  };

    return (
        <div className='parent'>
            <Form className='WRegForm'>
                <Form.Label className='WRegText'>Login</Form.Label>
            </Form>
            <Form className='WRegForm' onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingInput2"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="Enter email" className='mb-2' onChange={e => setEmail(e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <FloatingLabel
                        controlId="floatingInput3"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="Password" className='mb-2' onChange={e => setPassword    (e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit" className='mb-submit'>
                        Submit
                    </Button>
                </Form.Group>  
            </Form>
        </div>
    );
}

export default WLogin;