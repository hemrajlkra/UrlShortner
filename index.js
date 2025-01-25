const express = require('express');
const {ConnectToMongo} = require('./connection');  //importing the connection.js file
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const path = require('path');
const app = express();

const Port = 8000;

ConnectToMongo("mongodb://localhost:27017/urlshortner").then(
    ()=>console.log("Connected to MongoDB"));

app.set('view engine','ejs');//setting the view engine to ejs
app.set('views',path.resolve("./views")); //setting the views directory to the views folder

app.use(express.json());//middleware to parse the incoming request body
app.use(express.urlencoded({extended:false}));// this will support the json data along with the form data in the request body
app.use('/url',urlRoute); //initiation of the url route first phase of routing
app.use('/',staticRouter); //if the call is "/" then it will be redirected to the staticRouter


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