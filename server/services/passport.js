const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const { JWT_SECRET } = require('../config/keys')

// Create jwt strategy
const jwtOpts = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

// jwt strategy for passport authentication
const authChecker = new JwtStrategy(jwtOpts, async (tokenPayload, done) => {
    try { // check if user exists by user id from decoded token
        const user = await User.findById(tokenPayload.sub)
        return user ? done(null, user) // authorized
                    : done(null, false) // unauthorized
    }
    catch(err) {// unauthorized
        return done(err, false)
    }
})

// Create login strategy
const loginOpts = { usernameField: 'email'}

// login strategy for passport credentials authentication
const loginChecker = new LocalStrategy(loginOpts, async (email, password, done) => {
    try {// Verify email
        const user = await User.findOne({ email: email.toLowerCase() })
        if(!user) return done(null, false, {message: 'Invalid username/password'})
        // Verify password
        const isMatch = await user.comparePassword(password)
        if(!isMatch) return done(null, false, {message: 'Invalid username/password'})
        // Verify signup status
        //TODO: Allow user access but restrict functions??
        // if(!user.isVerified) {
        //     return done(null, false, {
        //         type: 'NOT_VERIFIED',
        //         message: 'Your account has not been verified'
        //     })
        // }
        return done(null, user)
    }
    catch(err) {
        return done(err, false)
    }
})
// use the strategy
passport.use(authChecker)
passport.use(loginChecker)