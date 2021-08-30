const mongoose = require('mongoose');
const defaultMoney = 20000;
const defaultEarning = 0;

const IUserUSA = mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId},
    name: {type: String, require: true},
    username: {type: String, require: true, unique: true},
    money: {type: Number, default: defaultMoney},
    capital: {type: Number, default: defaultMoney},
    earning: {type: Number, default: defaultEarning},
    stockCode: [{
        code: String,
        weight: Number,
        capital: Number,
        dateBuy: Date
    }],
    update_at: Date,
    create_at: Date
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User = mongoose.model('UserUSA', IUserUSA);
module.exports.UserUSA = User;