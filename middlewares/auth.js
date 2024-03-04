const { getUser } = require("../service/auth");


async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if(!userUid) return res.render("login", {
        url : req.protocol+"://"+req.headers.host,
    });
    const user = getUser(userUid);

    if(!user) return res.render("login", {
        url : req.protocol+"://"+req.headers.host,
    });

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
}