// import bcrypt for encode password
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import User model
const User = require('../models/User');

exports.register = async(req, res, next) =>{
    try{
        //1. Check if user already exists
        console.log('register controller');
        const { username, password } = req.body;
        console.log(username, password);

        let user = await User.findOne({username});   

        if(user){
            res.status(400).send('User already exist!');
            return;
        } else {
            //2. GRN SALT
            const salt = await bcrypt.genSalt(10);
            
            user = new User({
                username,
                password
            });
            //3. Hash password
            user.password = await bcrypt.hash(password, salt);
            //save user data to db
            await user.save();
            //send response to client
            res.send(`Register success!, ${user.password}`);
            return;
        }
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}
exports.login = async(req, res, next) =>{
    try{
        const { username, password } = req.body;
        let user = await User.findOneAndUpdate({username}, {new : true})

        if(user && user.enabled){
            //check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.status(400).send('Password is incorrect!');
                return;
            } else {
                // create Payload for jwt
                const payload = {
                    user : {
                        username : user.username,
                        role : user.role
                    }
                }
                //Generate jwt token
                // syntax : jwt.sign(payload, secret, options, callback)
                const token = jwt.sign(payload, 
                                        'jwtSecret', 
                                        {expiresIn : 3600}, 
                                        (err, token)=> {
                                            if(err) throw err;
                                            //send token to client
                                            //in token we attach username and role of user to client
                                            //and we can get these both value by jwt verification in backend
                                            res.json({token, payload})
                })
            }
            
        } else {
            return res.status(400).send('User not found!')
        }
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}

exports.editUser = async(req, res, next) =>{
    try{
        res.send('editUSer controller')
        // res.send(req.body.password);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}
exports.deleteUser = async(req, res, next) =>{
    try{
        res.send('deleteUser controller')
        // res.send(req.body.password);
    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}

exports.currentUser = async(req, res) => {
    try{
        //model User
        // req.user is coming from middleware line 17
        console.log('currentUser controller: ', req.user);
        //find user by username
        const user = await User.findOne({username : req.user.username})
        //except password
        .select('-password').exec();
        

        console.log('current user is: ', user);

        res.status(200).send(user);

    } catch(err){
        console.log(`error: ${err}`)
        res.status(500).send('Server is error!');
    }
}