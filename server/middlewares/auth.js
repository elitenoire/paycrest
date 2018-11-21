const passportConfig = require('../services/passport')
const passport = require('passport')

// Authentication middleware for protected routes
const requireAuth = passport.authenticate('jwt', {session: false})

// Verify credentials middleware for login route
const verifyCreds = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err) return next(err)
        if(!user) return res.status(401).json({msg: info.message, type: info.type})
        req.user = user
        next()
    })(req, res, next)
}

module.exports =  { requireAuth, verifyCreds }