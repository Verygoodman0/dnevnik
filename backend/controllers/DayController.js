import DayModel from "../models/Day.js"
//вот здесь уже начинается сущий кошмар 

export const getAll = async (req, res) => {
    try {
        const posts = await DayModel.find().populate('user').exec();

        res.json(posts)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить все статьи",
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const dayId = req.params.id;    
        const ans = await DayModel.findById({_id: dayId}) //вот это я сам писал горжусь
        res.json(ans)

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить статью",
        });
    }
}

export const remove = async (req, res) => {
    try {
        const dayId = req.params.id;    
        
        await DayModel.findByIdAndDelete({_id: dayId}); //это тоже я писал я хз почему оно работает наверное потому что я талант 
        res.json({
            success: true,
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить статью",
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new DayModel({
            text: req.body.text,
            avatarUrl: req.body.avatarUrl,
            user: req.userId,
            //еще images/files, tags
        }); 

        const day = await doc.save();

        res.json(day);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать",
        });
    }
}

export const update = async (req, res) => {
    try {
        const dayId = req.params.id;    

        await DayModel.updateOne({_id: dayId}, {
            text: req.body.text,
            avatarUrl: req.body.avatarUrl,
            user: req.userId,
            //еще images/files, tags

            //не забудь это тоже дополнить, еблан
        });

        res.json({
            succes: true,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить",
        });
    }
}