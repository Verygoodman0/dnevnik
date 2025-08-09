import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'; //загрузка картинок???
import cors from 'cors'

import { registerValidation, loginValidation,postCreateValidation } from './validations.js';
import {checkAuth, handleValidationErrors} from './utils/index.js'
import {UserController, DayController} from './controllers/index.js'


mongoose
    .connect("mongodb+srv://admin:admin@cluster0.b491zih.mongodb.net/dnevnik")
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express(); //создание экспересс приложения

const storage = multer.diskStorage({ // хранилище для всех загруженных картинок
    destination: (_, __, cb) => {
        cb(null, 'uploads'); //путь дя загрузки файлов
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);  //название сохраняемого файла
    },
});

const upload = multer({storage});

app.use(cors())
app.use(express.json()) //возможность читать json
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => { // что происходит при get запросе от пользователя
    res.send('ahhhh')
})

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`, //вернем клиенту путь к сохраненной картинке
        
    })
})

//дальше будут роуты для работы с самими "днями"
app.get('/days', checkAuth, DayController.getAll); //с помощью этого человек сможет получить все свои дни
app.get('/days/:id', checkAuth, DayController.getOne); 
app.post('/days', checkAuth, handleValidationErrors, DayController.create);
app.delete('/days/:id', checkAuth, DayController.remove);
app.patch('/days/:id', checkAuth, handleValidationErrors, DayController.update);

app.listen(4443, (err) => { //какой порт будет использоваться сайтом и что происходит при ошибке 
    if (err) {
        return console.log(err)
    }

    console.log('server OK')
});

