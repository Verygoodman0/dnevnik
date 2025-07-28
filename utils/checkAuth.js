import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); // при получении токена замени Bearer на ''
    
    if(token){
        try {
            const decoded = jwt.verify(token, 'rayman') //расшифрование токена

            req.userId = decoded._id; //получение id пользователя, через который можно узнать все остальное
            next(); //все нормально, можно выполнять следующую функцию
        } catch (err) {
            return res.status(403).json({ // если не удалось расшифровать
                message: "Нет доступа"
            })
        }
    }else{
        return res.status(403).json({ // если не передается токен
            message: "Нет доступа"
        })
    }
}