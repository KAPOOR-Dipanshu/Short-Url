const { getUser } = require('../service/auth')

async function restrictToLoggedInUser(req, res, next) {
    const userid = req.cookies?.uuid;
    if(!userid){
        return res.redirect('/login')
    }

    const user = getUser(userid);
    // console.log(user)
    
    if(!user) {
        return res.redirect('/login')
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const userid = req.cookies?.uuid;

    const user = getUser(userid);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth,
}