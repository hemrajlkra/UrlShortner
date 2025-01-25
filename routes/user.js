const express = require('express');
const {handleUserRegister,handleUserLogin } = require('../controllers/user');
const router = express.Router();

router.post('/',handleUserRegister);//post request to register a new user
router.post('/login',handleUserLogin);//get request to login a user
module.exports = router;