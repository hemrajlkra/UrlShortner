require('dotenv').config();
const express = require('express');
const {ConnectToMongo} = require('./connection');  //importing the connection.js file
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const {restrictToLoggedUserOnly,checkAuth} = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

const Port = process.env.Port || 8000;

ConnectToMongo(process.env.MONGODB_URI)
.then(()=>console.log("Connected to the database"))
.catch((err)=>console.log(err));

app.set('view engine','ejs');//setting the view engine to ejs
app.set('views',path.resolve("./views")); //setting the views directory to the views folder
// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());//middleware to parse the incoming request body
app.use(express.urlencoded({extended:false}));// this will support the json data along with the form data in the request body

//adding the middleware below to restrict the access to the url route only to the logged in users
app.use(cookieParser());
app.use('/url',restrictToLoggedUserOnly,urlRoute); //initiation of the url route first phase of routing
app.use('/user',userRoute);// if the call is "/user" then it will be redirected to the userRouter
//checking auth of user if the user is logged in it will see only urls created by him...
// if not logged in it will see all the urls
app.use('/',checkAuth,staticRouter); //if the call is "/" then it will be redirected to the staticRouter
app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry =await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory:{timestamp:Date.now()} //pushing the timestamp of the visit to the visitHistory array
            }
        }
    )
    res.redirect(entry.redirectUrl);
});

app.listen(Port,()=>{console.log(`Server is running on port ${Port}`)});