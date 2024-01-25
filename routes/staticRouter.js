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

router.get('/signup' ,(req, res) => {
    return res.render('signup')
})

router.get('/login' ,(req, res) => {
    return res.render('login')
})

module.exports = router