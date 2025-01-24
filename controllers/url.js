const shortId = require('shortid');

const Url = require('../models/url');

async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortID = shortId(); //defines the length of the short url
    await Url.create(
        {
            shortId:shortID,
            redirectUrl:body.url,
            visitHistory:[],
        }
    );
    return res.json({id:shortID});
}

module.exports={
    handleGenerateNewShortUrl,
};