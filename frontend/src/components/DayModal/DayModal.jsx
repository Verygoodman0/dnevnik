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
  const [images, setImages] = useState([]);

  const inputFileRef = useRef(null);
  const inputFilesRef = useRef(null);
  
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

  const handleChangeFiles = async (event) => { //вот здесь я загружаю несколько фото с одного импута 
    try {
      let imagesVar = [];
      for(let i = 0; i < event.target.files.length; i++){
        const formData = new FormData();
        const file = event.target.files[i];
        formData.append('image', file);
        const { data } = await axios.post('/upload', formData); 
        imagesVar.push(`http://localhost:4443${data.url}`);
      }
      setImages(imagesVar);
    } catch(err){
      console.warn(err);
      alert('Ошибка при загрузке файлов');
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
      "images": images,
    };

    console.log(fields)

    await axios.post('/days', fields);
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

  return (
    <>
      {isBlank ? (
          <>
            <button variant="primary" onClick={handleShow} className={buttonClasses}> 
              <img src={props.avatarUrl} alt="loading..." className={iconClasses}/>
              {!isBig ? <p className={props.index < 10 ? 'day_iconText_1' : 'day_iconText_2'}>{props.index}</p> : <p></p>}
            </button>

            <Modal size="lg" show={show} onHide={handleClose}>
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
                      <td className='modal_text'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Текст записи</Form.Label>
                          <Form.Control as="textarea" rows={5} onChange={e => setText(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3"> {/* для одного файла */}
                          <Form.Control ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-3"> {/* для нескольких файлов */}
                          <Form.Control ref={inputFilesRef} type="file" onChange={handleChangeFiles} multiple hidden/>
                        </Form.Group>
                      </td>
                    </tr>
                  </table>
                  <button className='add_pictures' type="button" onClick={() => inputFilesRef.current.click()}> 
                    Добавить изображения
                  </button>
                  {images.map((imageUrl) => (
                    <>
                      <img src={imageUrl} alt="loading..." className='added_image'/>
                    </>
                  ))}
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