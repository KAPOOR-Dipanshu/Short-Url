const express = require('express');
const URL = require('../models/url');

const router = express.Router()

router.get('/' , async (req, res) => {
    const allUrls = await URL.find({});
    const baseUrl = req.url;
    return res.render('home', {
        urls: allUrls,
        base: baseUrl,
    });
})

module.exports = router