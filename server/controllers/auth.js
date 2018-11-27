const jwt = require('jsonwebtoken')
const naijaNumber = require('naija-phone-number')
const User = require('../models/user')
const Token = require('../models/token')
const { JWT_SECRET } = require('../config/keys')
const { sms } = require('../services/africastalking')
const jsotp = require('jsotp');
const uniqid = require('uniqid')

// utils
const generateToken = user => {
    const payload = {name: user.firstName, sub: user._id}
    return jwt.sign( payload, JWT_SECRET, { expiresIn : '6h'})
}

// Sign-up Controller
exports.signup = async (req, res, next) => {
    const { email, password, firstName, lastName, phone } = req.body
    // exisiting email throws error, new email creates new user
    try {
        const oldUser = await User.findOne({ $or: [ {email}, {phone}] }, 'email phone')
        if( oldUser && oldUser.email === email) return res.status(422).json({error: 'Email already registered.'})
        if( oldUser && oldUser.phone === phone) return res.status(422).json({error: 'Phone no already registered.'})
        //TODO: if User has both email and phone
        const newUser = await User.create({ email, password, firstName, lastName, phone })
        // send signup verification email
        const BASE_URL = req.protocol + "://" + req.get('host')
        const token = new Token({_userId: newUser._id })
        await token.sendVerificationToken(newUser, BASE_URL)
        // on successful email delivery
        return res.status(200).json({
            token: generateToken(newUser),
            name: newUser.name,
            msg: `Verification email sent to ${newUser.email}`
        })
    }
    catch(err) {
        if(err.errors){// Validation errors
            const { phone, email } = err.errors
            if(phone) return res.status(500).json({ error: phone.message})
            if(email) return res.status(500).json({ error: email.message})
        }
        // return next(err)
        res.status(500).json({ error: 'Unable to sign up. Try again later.' })
    }
}

// Login Controller
exports.login = (req, res) => {
    return res.status(200).json({
        token: generateToken(req.user),
        msg: 'Login success',
        status: 'ok',
        name: req.user.firstName
    })
}

exports.sendOtp = async (req, res, next) => {
    // Validate Phone number
    // Check if number exists in db
    // Send sms with verification code
    const phone = req.body.phone
    const isValid = naijaNumber.isValid(phone)
    if(!isValid) return res.status(422).json({ msg: 'Invalid phone number' })
    try {
        let user = await User.findOne({ phone })
        if(user) {
            // Generate time sensitive OTP
            // Send OTP to phone via sms
            const otpSecret = jsotp.Base32.random_gen()
            const totp = jsotp.TOTP(otpSecret, 90)
            const code = totp.now()
            const to = '+234' + phone.substring(1)
            const message = `Your OTP is ${code}.`
            const response = await sms.send({ to, message, enque: true })
            const requestId = uniqid()
            user.secret = otpSecret
            user.requestId = requestId
            const s = await user.save()
            return res.status(200).json({ msg: 'Your OTP has been sent', status: 'ok', requestId })
        }
        else { return res.status(422).json({ msg: 'Unregistered phone number' })}
    }
    catch(e){
        console.log(e)
        // res.status(500).send(e)
        res.status(500).json({ error: 'Service is unavailable. Try again later.' })
    }
}

exports.verifyOtp = async (req, res, next) => {
    // Verify code
    // Log in user
    const { otp, requestId } = req.body
    if (!(!!otp && !!requestId)) {
        return res.status(400).json({ msg: 'Refresh for a new code', status: 'err' })
    }
    try{
        let user = await User.findOne({ requestId })
        if(user){
            const totp = jsotp.TOTP(user.secret, 90)
            const isMatch = totp.verify(otp)
            // Verified OTP -> Log in user
            if(isMatch){
                // Reset secret and requestid
                user.secret = null
                user.requestId = null
                user = await user.save()
                req.user = user
                return next()
            }// No match
            return res.status(422).json({ msg: 'Your code is invalid', status: 'err' })

        }
        return res.status(422).json({ msg: 'Invalid Request. Refresh page.', status: 'err' })
    }
    catch(e){
        console.log(e)
        // res.status(500).send(e)
        res.status(500).json({ error: 'Service is unavailable. Try again later.' })
    }
}