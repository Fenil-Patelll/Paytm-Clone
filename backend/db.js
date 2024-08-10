const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },
    balance : {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User",userSchema)
const Account = mongoose.model("Account", accountSchema)
module.exports = {User, Account}