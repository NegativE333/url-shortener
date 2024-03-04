const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    const bodyUrl = body.url;
    if(!body.url) return res.status(400).json({error : 'url is required'});
    const shortId = shortid();
    const result = await URL.findOne({bodyUrl});
    console.log(result);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {
        url: req.protocol+"://"+req.headers.host,
        id: shortId
    })
}

async function handleGetAnalytics(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : 'url is required'});
    const arr = body.url.split('/');
    const shortId = arr[arr.length - 1];
    const result = await URL.findOne({shortId});
    return res.render("home", {
        url: req.protocol+"://"+req.headers.host,
        totalClicks: result.visitHistory.length !== 0 ? result.visitHistory.length : '0',
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}