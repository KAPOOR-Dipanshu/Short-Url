const {v4: uuidv4} = require('uuid')
const User = require('../models/user')
const {setUser, getUser} = require('../service/auth')

async function handleUserSignup(req, res) {
    const {name, password , email} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect('/')
}

async function handleUserLogin(req, res) {
    const {password , email} = req.body;
    const user = await User.findOne({email , password})
    if(user){
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uuid', sessionId);
        return res.redirect('/')
    }else{
        return res.render('login',{ error: 'Invalid Username or Password'});
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}