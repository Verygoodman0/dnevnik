import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import axios from '../../axios.js';
import './DayModal.css'

function DayModal(props) {
  const [isLoading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [text, setText] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData); 
      setAvatarUrl(data.url);
    } catch(err){
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  }

  const handleClose = async () => {
    setShow(false)
    setLoading(true);

    const fields = {
      "text": text, 
      "avatarUrl": `http://localhost:4443${avatarUrl}`, 
      "year": props.year,
      "month": props.month,
      "day": props.day,
    };
    console.log(fields);
    const { data } = await axios.post('/days', fields);
    avatar = `http://localhost:4443${avatarUrl}`;
    isBlank = false;
    window.location.reload()
  };
  const handleShow = () => setShow(true);
  let isBlank = props.isBlank;
  let avatar = props.avatarUrl;

  return (
    <>
      {isBlank ? (
          <>
            <Button variant="primary" onClick={handleShow} className='day_button'> 
              <img src={props.avatarUrl} alt="loading..." className='day_icon'/>
              <p className={props.index < 10 ? 'day_iconText_1' : 'day_iconText_2'}>{props.index}</p>
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Создать запись</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Текст записи</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={e => setText(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" onChange={handleChangeFile}/>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
      ) : (
        <>
          <Button variant="primary" onClick={handleShow} className='day_button'> 
            <img src={avatar} alt="loading..." className='day_icon'/>
            <p className={props.index < 10 ? 'day_iconText_1' : 'day_iconText_2'}>{props.index}</p>
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Редактировать запись</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Редактировать текст</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={e => setText(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" onChange={handleChangeFile}/>
                  </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
      </>
      )}
    </>
  );
}

export default DayModal;