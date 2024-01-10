const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    const baseUrl = req.protocol + '://' + req.get('host') + '/url/';
    if(!body.url) return res.status(400).json({ error: `url is required` })
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });
    
    return res.render("home",{ 
        id: shortID,
        base: baseUrl
    })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const event = await URL.findOne({shortId});
    return res.json({ totalVisits: event.visitHistory.length,
         analytics: event.visitHistory,
        });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}