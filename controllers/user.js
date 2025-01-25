const user = require('../models/user');

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
    return res.redirect('/');
}
module.exports = {
    handleUserRegister,
    handleUserLogin
}