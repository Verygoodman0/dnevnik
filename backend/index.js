import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'; //загрузка картинок???

import { registerValidation, loginValidation,postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as DayController from './controllers/DayController.js';
import { checkSchema } from 'express-validator';
import handleValidationErrors from './utils/handleValidationErrors.js';

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

app.use(express.json()) //возможность читать json
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => { // что происходит при get запросе от пользователя
    res.send('ahhhh')
})

app.post('/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`, //вернем клиенту путь к сохраненной картинке
        
    })
})

//дальше будут роуты для работы с самими "днями"
app.get('/posts', checkAuth, DayController.getAll); //с помощью этого человек сможет получить все свои дни
app.get('/posts/:id', checkAuth, DayController.getOne); 
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, DayController.create); //не знаю, нужно ли создание, но пока пусть будет
app.delete('/posts/:id', checkAuth, DayController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, DayController.update);

app.listen(4443, (err) => { //какой порт будет использоваться сайтом и что происходит при ошибке 
    if (err) {
        return console.log(err)
    }

    console.log('server OK')
});

