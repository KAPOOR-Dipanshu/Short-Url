const { getUser } = require('../service/auth')

async function restrictToLoggedInUser(req, res, next) {
    const userid = req.cookies?.uuid;
    if(!userid){
        return res.redirect('/login')
    }

    const user = await getUser(userid);
    if(!user) return res.redirect('/login')

    req.user = user
    next();
}

module.exports = {
    restrictToLoggedInUser,
}