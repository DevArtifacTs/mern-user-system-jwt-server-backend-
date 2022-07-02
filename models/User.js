const mongoose = require('mongoose');

//! create user schemas

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
    },
    password : {
        type : String,
    },
    role : {
        type : String,
        default : 'user',
    },
    enabled : {
        type : Boolean,
        default : false,
    }   
    },
    {timestamps : true}
    );

//store user model
const User = mongoose.model('User', UserSchema);

module.exports = User;