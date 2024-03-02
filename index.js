const express = require("express");
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require("./connect");
const URL = require('./models/url');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("Connected to mongo db.");
    })

app.use(express.json());

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push : {
        visitHistory: {
            timestamp : Date.now(),
        },
    }});

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log("Server started at port 8001."));