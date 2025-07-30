import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import './WLogin.css'

function WLogin() {
  return (
    <div className='parent'>
        <Form className='WRegForm'>
            <Form.Label className='WRegText'>Registration</Form.Label>
        </Form>
        <Form className='WRegForm'>
            <Form.Group controlId="formBasicfullName">
                <FloatingLabel
                    controlId="floatingInput1"
                    label="Nickname"
                    className="mb-3"
                >
                    <Form.Control type="fullName" placeholder="enter your full Name" className='mb-2'/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <FloatingLabel
                    controlId="floatingInput2"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="Enter email" className='mb-2'/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <FloatingLabel
                    controlId="floatingInput3"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control type="password" placeholder="Password" className='mb-2'/>
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFileLg">
                <Form.Label className='mb-2'>Upload avatar (optional)</Form.Label>
                <Form.Control type="file" size="lg"/>
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