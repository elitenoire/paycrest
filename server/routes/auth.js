const authRouter = require('express').Router();
const Authentication = require('../controllers/auth')
const { verifyCreds } = require('../middlewares/auth')

// signup route handler
authRouter.post('/signup', Authentication.signup)
// login route handler
authRouter.post('/login', verifyCreds, Authentication.login)


module.exports = authRouter

