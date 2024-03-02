const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.render("home", {
        url: req.protocol+"://"+req.headers.host
    });
})

module.exports = router;