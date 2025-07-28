import DayModel from "../models/Day.js"
//вот здесь уже начинается сущий кошмар 

export const create = async (req, res) => {
    try {
        const doc = new DayModel({
            text: req.body.text,
            avatarUrl: req.body.avatarUrl,
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