const {getUser}=require('../services/auth');

async function restrictToLoggedUserOnly(req,res,next){
    const userId = req.cookies?.userid;
    if(!userId) return res.redirect('/login');
    const user = getUser(userId);
    if(!user) return res.redirect('/login');
    req.user = user; //setting the user in the request object this will be used in the url route when we create a new url
    next();
}

async function checkAuth(req,res,next){
    const userId = req.cookies?.userid;
    const user = getUser(userId);
    req.user = user;
    next();
}

module.exports={
    restrictToLoggedUserOnly,
    checkAuth,
}