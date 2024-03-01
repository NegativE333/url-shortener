const express = require("express");
const urlRoute = require('./routes/url');
const { connectToMongoDb } = require("./connect");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("Connected to mongo db.");
    })

app.use

app.use("/url", urlRoute);

app.listen(PORT, () => console.log("Server started at port 8001."));