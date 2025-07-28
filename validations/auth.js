import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(), 
    body('password', 'Пароль дожден содержать не менее 5 символов').isLength({min: 5}),
    body('fullName', 'имя должно содержать не менее 3 символов').isLength({min: 3}),
    body('avaterUrl', 'Неверная ссылка на аватар').optional().isURL(),
];
