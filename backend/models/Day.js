import { urlencoded } from "express";
import mongoose from "mongoose";
//вот здесь уже начинается сущий кошмар 

const DaySchema = new mongoose.Schema( // все свойства одного для в дневнике
    {
        text: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        avatarUrl: String,
        // здесь еще нужна возможность добавления любого кол-ва фотографий и файлов  
        // еще можно добавить теги, по которым сделать быстрый поиск 
    },
    {
        timestamps: true //автоматическая дата создания и обновления
    },
);

export default mongoose.model('Day', DaySchema)