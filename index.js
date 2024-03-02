const express = require("express");
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const { connectToMongoDb } = require("./connect");
const URL = require('./models/url');
const path = require('path');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("Connected to mongo db.");
    })

//Setting up ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve("./public")));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get('/url/:shortId', async (req, res) => {
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