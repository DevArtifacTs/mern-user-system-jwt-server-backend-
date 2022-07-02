// import bcrypt for encode password
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import User model
const User = require('../models/User');

exports.listUsers = async(req, res, next) =>{
    try{
        // res.send('hello list user');
        const user = await User.find().select('-password').exec();
        res.send(user);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}

//GET
exports.readUsers = async(req, res, next) =>{
    try{
        // res.send('hello read user');
        const id = req.params.id;
        const user = await User.findOne({_id : id}).select('-password').exec();
        res.send(user);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}
//PUT
exports.updateUsers = async(req, res, next) =>{
    try{

        //for a better reset logic , we should provide a old password confirmation if pass then can reset password 
        console.log('req.body.password :', req.body.password);
        //1. GEN SALT
        const salt = await bcrypt.genSalt(10);
        //2.ENCRYPT PASSWORD
        const newPassword = await bcrypt.hash(req.body.password, salt);
        //3. find user by _id and update
        const user = await User.findOneAndUpdate({_id : req.params.id}, {password : newPassword});
        //send response to client
        res.send(`password reset successfully!, ${user.password}`);
        return;
        res.send('hello update user');
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}
//DELETE
exports.deleteUser = async (req, res, next) =>{
    // console.log('deleteUser controller');
    try{
        // res.send('hello remove user');
        console.log('deleteUser controller');
        const id = req.params.id
        console.log('id :', id);
        const user = await User.findOneAndDelete({ _id : id});
        res.send(user);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Delete failed!');
    }
}

//changeUserStatus
exports.changeUserStatus = async ( req, res, next) => {
    try{
        console.log('req.body :', req.body);
        const user = await User.findOneAndUpdate({_id : req.body.id}, {enabled : req.body.enabled });
        res.send(user);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(401).send('You are not admin!');
    }
}

//changeUserRole
exports.changeUserRole = async ( req, res, next) => {
    try{
        console.log('req.body :', req.body);
        const user = await User.findOneAndUpdate({_id : req.body.id}, {role : req.body.role });
        res.send(user);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(401).send('You are not admin!');
    }
}

//resetPassword
exports.resetPassword = async ( req, res, next) => {
    console.log('reset password!');
    try{
        res.send('hello reset password');
        console.log('reset password!');
        // console.log('req.body :', req.body);
        // const user = await User.findOneAndUpdate({_id : req.body.id}, {role : req.body.role });
        // res.send(user);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(401).send('You are not admin!');
    }
}
