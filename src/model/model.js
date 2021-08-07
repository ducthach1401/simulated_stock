const mongoose = require('mongoose');
const defaultMoney = 10000000;

const IUser = mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type: String, require: true},
    username: {type: String, require: true, unique: true, index: true},
    password: {type: String, require: true},
    money: {type: Number, default: defaultMoney},
    stockCode: [{
        code: {type: String, unique:true},
        cost: Number,
        weight: Number,
        dateBuy: Date
    }],
    update_at: Date,
    create_at: Date
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('User', IUser);
module.exports.User = User;