import express from 'express'
import mongoose from 'mongoose'

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';

mongoose
    .connect("mongodb+srv://admin:admin@cluster0.b491zih.mongodb.net/dnevnik")
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express(); //создание экспересс приложения

app.use(express.json()) //возможность читать json

app.get('/', (req, res) => { // что происходит при get запросе от пользователя
    res.send('ahhhh')
})

app.post('/login', UserController.login)
app.post('/register', registerValidation, UserController.register)
app.get('/me', checkAuth, UserController.getMe)

app.listen(4443, (err) => { //какой порт будет использоваться сайтом и что происходит при ошибке 
    if (err) {
        return console.log(err)
    }

    console.log('server OK')
});

