import { urlencoded } from "express";
import mongoose from "mongoose";
//вот здесь уже начинается сущий кошмар 

const DaySchema = new mongoose.Schema( // все свойства одного для в дневнике
    {
        text: {
            type: String,
            required: true,
        },
        avatarUrl: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        year: { type: Number, required: true,},
        month: { type: String, required: true,}, //это пиздец какое плохое решение наверное 
        day: { type: Number, required: true,},
        // здесь еще нужна возможность добавления любого кол-ва фотографий и файлов  
        // надо придумать как подтянуть эти данные с фронта (ахуеть)
    },
    {
        timestamps: true //автоматическая дата создания и обновления
    },
);

export default mongoose.model('Day', DaySchema)