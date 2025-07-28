import { validationResult } from 'express-validator'; //хрень, которая проверяет наличие ошибок валидации

export default (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()){ 
            return res.status(400).json(errors.array());
        };

    next();
}

