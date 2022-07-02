const express = require('express');
const router = express.Router();

//import controllers
const { listUsers, readUsers, updateUsers, changeUserStatus, changeUserRole, deleteUser, resetPassword} = require('../controllers/users');

//middlewares
const {auth, adminCheck } = require('../middleware/auth')

//Routes

//@Endpoint :   http://localhost:4001/api/users
//@Method :     GET
//@Access :     Private
// auth : for login user only
/// adminCheck : for admin only if not pass then can't access the userList
router.get('/users',auth, adminCheck, listUsers);

//@Endpoint :   http://localhost:4001/api/users/:id
//@Method :     GET
//@Access :     Private
router.get('/users/:id', readUsers);

//@Endpoint :   http://localhost:4001/api/users/:id
//@Method :     PUT
//@Access :     Private
router.put('/users/:id',auth, adminCheck, updateUsers);

//@Endpoint :   http://localhost:4001/api/users/:id
//@Method :     DELETE
//@Access :     Private
// router.delete('/users/:id', removeUser);

//@Endpoint :   http://localhost:4001/api/change-status
//@Method :     POST
//@Access :     Private
router.post('/change-status', auth, adminCheck, changeUserStatus);

//@Endpoint :   http://localhost:4001/api/change-role
//@Method :     PUT
//@Access :     Private
router.put('/change-role', auth, adminCheck, changeUserRole);

//@Endpoint :   http://localhost:4001/api/users/:id
//@Method :     DELETE
//@Access :     Private
router.delete('/users/:id', auth, adminCheck, deleteUser);

//@Endpoint :   http://localhost:4001/api/users/:id
//@Method :     PUT
//@Access :     Private
// router.put('/users/:id', auth, adminCheck, resetPassword);

module.exports = router;