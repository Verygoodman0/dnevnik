import mongoose from "mongoose";

const UserSchema = new mongoose.Schema( // все свойства пользователя
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        timestamps: true //автоматическая дата создания и обновления
    },
);

export default mongoose.model('User', UserSchema)