import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(), 
    body('password', 'Пароль дожден содержать не менее 5 символов').isLength({min: 5}),
    body('fullName', 'имя должно содержать не менее 3 символов').isLength({min: 3}),
    body('avaterUrl', 'Неверная ссылка на аватар').optional().isURL()
];

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(), 
    body('password', 'Пароль дожден содержать не менее 5 символов').isLength({min: 5})
];

export const postCreateValidation = [
    body('text', 'введите текст').isLength({min: 2}), 
    body('avatarUrl', 'Неверная ссылка на изображение').isURL(),
    body('day', 'Неверная ссылка на изображение').isNumeric(),
    body('month', 'Неверная ссылка на изображение').isString(),
    body('year', 'Неверная ссылка на изображение').isNumeric(),
    //сюда тоже не забудь добавить другие данные 
];