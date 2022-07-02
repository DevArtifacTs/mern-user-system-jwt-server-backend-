const express = require('express');
const router = express.Router();

//import controllers
const {register, login, editUser, deleteUser, currentUser  } = require('../controllers/auth')

//middlewares
const {auth, adminCheck} = require('../middleware/auth')

//Routes

//METHOD #1 register
//@Endpoint :   http://localhost:4001/api/register
//@Method :     POST
//@Access :     Public
router.post('/register', register);

//METHOD #1 login
//@Endpoint :   http://localhost:4001/api/login
//@Method :     POST
//@Access :     Public
router.post('/login', login);

//@Endpoint :   http://localhost:4001/api/current-user
//@Method :     POST
//@Access :     private
router.post('/current-user', auth, currentUser);

//@Endpoint :   http://localhost:4001/api/current-user
//@Method :     POST
//@Access :     private
router.post('/current-admin', auth, adminCheck, currentUser);


module.exports = router;