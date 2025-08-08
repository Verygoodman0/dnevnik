import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames';
import add_avatar from '../../assets/add_avatar2.png'

import axios from '../../axios.js';
import './DayModal.css'

function DayModal(props) {
  const [isLoading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [text, setText] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  const [uploadedAvatar, setUploadedAvatar] = useState();

  const inputFileRef = useRef(null);
  
  let isBlank = props.isBlank;
  let isBig = props.isBig;
  let avatar = props.avatarUrl;

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData); 
      setAvatarUrl(data.url);
      setUploadedAvatar(data.url);
    } catch(err){
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  }

  const handleClose = () => {
    setShow(false);
  }

  const handleSubmit = async () => {
    setShow(false);
    setLoading(true);

    const fields = {
      "text": text, 
      "avatarUrl": `http://localhost:4443${avatarUrl}`, 
      "year": props.year,
      "month": props.month,
      "day": props.day,
    };
    const { data } = await axios.post('/days', fields);
    isBlank = false;
    avatar = `http://localhost:4443${avatarUrl}`;
    window.location.reload();
  };
  const handleShow = () => setShow(true);
  
  var buttonClasses = classNames({
    'day_button': true,
    'big': isBig == true,
    'small': isBig == false,
  });

  var iconClasses = classNames({
    'day_icon': true,
    'big': isBig == true,
    'small': isBig == false,
  });

  console.log(props);
  
  return (
    <>
      {isBlank ? (
          <>
            <button variant="primary" onClick={handleShow} className={buttonClasses}> 
              <img src={props.avatarUrl} alt="loading..." className={iconClasses}/>
              {!isBig ? <p className={props.index < 10 ? 'day_iconText_1' : 'day_iconText_2'}>{props.index}</p> : <p></p>}
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Создать запись</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <table>
                    <tr>
                      <td>
                        <button className='add_avatar' type="button">
                          <img onClick={() => inputFileRef.current.click()} src={!uploadedAvatar ? add_avatar : `http://localhost:4443${avatarUrl}`} alt="loading..." className='add_avatar_img'/>
                        </button>
                      </td>
                      <td>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Текст записи</Form.Label>
                          <Form.Control as="textarea" rows={5} onChange={e => setText(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Control ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                        </Form.Group>
                      </td>
                    </tr>
                  </table>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
      ) : (
        <>
          <button
            variant="primary" 
            onClick={handleShow} 
            className={buttonClasses}>  
              <img src={avatar} alt="loading..." className={iconClasses}/>
              {!isBig ? <p className={props.index < 10 ? 'day_iconText_1' : 'day_iconText_2'}>{props.index}</p> : <p/>}
          </button>

          <Modal show={show} onHide={handleClose}>
            <Navigate to={`/days/${props.dayId}`}/>
          </Modal>
      </>
      )}
    </>
  );
}

export default DayModal;