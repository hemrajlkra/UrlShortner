const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require('../controllers/url');
const router = express.Router();


router.post('/',handleGenerateNewShortUrl);//post request to generate a new short url
router.get('/analytics/:shortId',handleGetAnalytics);//get request to get the analytics of the short url

module.exports = router;