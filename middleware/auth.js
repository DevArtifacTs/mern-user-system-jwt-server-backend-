//import user model
const User = require('../models/User');

//use middleware for filter the very early stage of request
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try{
        console.log('auth enter!')
        //access to token from header and key name
        const token = req.header('authToken');
        if(!token){
            return res.status(401).send('No token, authorization denied');
        } else {
            //verify token
            const verified = jwt.verify(token, 'jwtSecret');
            console.log('middleware: ', verified);

            //if token is valid, server can map the token from front end and get the data from it
            // eg: username => you can learn about why token have a user data in controllers/users.js in login function line 40-69

            //store verified user in req.user and send it to next middleware as a req
            req.user = verified.user;
            // pass the logic flow to next middleware or controller => go to currentUser() 
            // in ./controllers/auth.js to get a desired username base on token sent from front end
            console.log('auth passed')
            next();
            return;
        }
    } catch(err){
        console.log('auth not pass')
        console.log(`error: ${err}`)
        res.status(401).send('Token is invalid!');
    }
}

exports.adminCheck = async (req, res, next) => {
    try{
        //receive req.user from auth middleware
        const { username } = req.user;
        // query database to check if user is admin (search by username)
        const adminUser = await User.findOne({ username }).exec();

        //check role
        if(adminUser.role !== 'admin'){
            console.log('adminCheck failed')
            return res.status(403).send('You are not admin!');
        } else {
            console.log('adminCheck passed')
            return next();
        }

    } catch(err){
        console.log(`error: ${err}`)
        res.status(401).send('You are not admin!');
    }
}

