const user = require('../models/user');
const {v4: uuidv4} = require('uuid');
const {setUser,getUser} = require('../services/auth');
const { set } = require('mongoose');
async function handleUserRegister(req,res){
    const {name, email, password} = req.body;
    await user.create({
        name,
        email,
        password
    });
    return res.redirect('/');
}
async function handleUserLogin(req,res){
    const {email, password} = req.body;
    const result = await user.findOne({email,password});
    if(!result) return res.status(400).render("login",{error:"Invalid email or password"});
    const token = setUser(result); // this token is the sessionId that we will use to identify the user
    res.cookie('userid',token); // we set the cookie with the sessionId
    return res.redirect('/');
}
module.exports = {
    handleUserRegister,
    handleUserLogin
}