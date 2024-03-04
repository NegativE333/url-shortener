const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.render("home", {
        url: req.protocol+"://"+req.headers.host
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup", {
        url: req.protocol+"://"+req.headers.host
    })
})

router.get("/login", (req, res) => {
    return res.render("login", {
        url: req.protocol+"://"+req.headers.host
    })
})

module.exports = router;