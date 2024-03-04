const User = require("../models/user");
const { v4 : uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.render("home", {
        url: req.protocol+"://"+req.headers.host
    });
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({email, password});

    if(!user) return res.render("login", {
        url: req.protocol+"://"+req.headers.host,
        error: "Invalid username or password."
    });

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    return res.render("home", {
        url: req.protocol+"://"+req.headers.host
    });
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
};