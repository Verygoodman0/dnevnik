import jwt from 'jsonwebtoken' //библиотека для регистрации по токенам
import bcrypt from 'bcrypt' //библиотека для шифрования паролей
import UserModel from '../models/User.js'

export const register = async (req, res) => { //async значит, что функция работает асинхронно. типа доп потока для запросов к серверу
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10); // типа алгоритма шифрования пароля
        // await приостанавливает выполнение кода внутри асинхронной функции (до окончания шифрования???)
        const hash = await bcrypt.hash(password, salt); 

        const doc = new UserModel({ // буквально документ нового пользователя
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save(); //сохранение пользователя в базе данных

        const token = jwt.sign({
            _id: user._id //что зашифровано в токене
        },
        'rayman', //слово для шифра
        {
            expiresIn: '30d', //типа срока жизни этого токена
        },
        );

        const {passwordHash, ...userData} = user._doc; // вытаскиваем passwordHash из user._doc и называем это userData

        res.json({
            ... userData,
            token,
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегестрироваться",
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email }) //попытка найти пользователя по email

        if(!user){
            return res.status(404).json({
                message: 'Неверный логин или пароль', 
            })
        }

        const isValdPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValdPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль', 
            })
        }

        const token = jwt.sign({
            _id: user._id //что зашифровано в токене
        },
        'rayman', //слово для шифра
        {
            expiresIn: '30d', //типа срока жизни этого токена
        },
        );

        const {passwordHash, ...userData} = user._doc; // вытаскиваем passwordHash из user._doc и называем это userData

        res.json({
            ... userData,
            token,
        })

    } catch(err) { //конструкция для отлавливания ошибок
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
}

export const getMe = async (req, res) => { //checkAuth здесь решает, выполнять ли следующую функцию
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }
        const {passwordHash, ...userData} = user._doc; // вытаскиваем passwordHash из user._doc и называем это userData

        res.json({
            ... userData
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Нет доступа"
        })
    }
}