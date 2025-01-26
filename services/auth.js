const jwt = require('jsonwebtoken');
const secret = "My_SeCrEt_K3Y";
//with session id if the server restarts the session will be lost as it was stored in memory
//we can use jwt to store the session in the cookie as it will use state less session management
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email
    },secret);
}
function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }
    catch(e){
        return null;
    }
}

module.exports={
    setUser,
    getUser
}