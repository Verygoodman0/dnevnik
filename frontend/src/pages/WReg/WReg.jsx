import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import './WReg.css'

function WReg() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await dispatch(fetchRegister({
            'fullName': fullname,
            'email': email,
            'password': password,
        }));

        if (!data.payload){
            return alert('Не удалось зарегестрироваться');
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
                <Form.Label className='WRegText'>Registration</Form.Label>
            </Form>
            <Form className='WRegForm' onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicfullName">
                    <FloatingLabel
                        controlId="floatingInput1"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control type="fullName" placeholder="enter your full Name" className='mb-2' onChange={e => setFullname(e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>
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
                        <Form.Control type="password" placeholder="Password" className='mb-2' onChange={e => setPassword(e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formFileLg">
                    <Form.Label className='mb-2'>Upload avatar (optional)</Form.Label>
                    <Form.Control type="file" size="lg"/>
                </Form.Group> */} 
                {/* какой еблан будет просить при регистрации аватар загрузить */}

                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit" className='mb-submit'>
                        Submit
                    </Button>
                </Form.Group>  
            </Form>
        </div>
    );
}

export default WReg;