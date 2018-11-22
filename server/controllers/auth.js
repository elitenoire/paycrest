const jwt = require('jwt-simple')
const naijaNumber = require('naija-phone-number')
const User = require('../models/user')
const Token = require('../models/token')
const { JWT_SECRET } = require('../config/keys')

const { sms } = require('../services/africastalking')
const jsotp = require('jsotp');
const uniqid = require('uniqid')



// utils
const generateToken = user => {
    return jwt.encode({sub: user.id, iat: Date.now()}, JWT_SECRET)
}
const generateOtp = () => { // Random 6 digits
    return Math.floor(100000 + Math.random() * 900000)
}

// Sign-up Controller
exports.signup = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body
    
    // exisiting email throws error, new email creates new user
    try {
        const oldUser = await User.findOne({ email })
        if(oldUser) return res.status(422).json({error: 'Email already exists.'})
        const newUser = await User.create({ email, password, firstName, lastName })
        // send signup verification email
        const BASE_URL = req.protocol + "://" + req.get('host')
        const token = new Token({_userId: newUser._id })
        await token.sendVerificationToken(newUser, BASE_URL)
        // on successful email delivery
        return res.status(200).json({
            token: generateToken(newUser),
            msg: `Verification email sent to ${newUser.email}`
        })
    }
    catch(err) {
        return next(err) // res.status(500).send(err)
    }
}

// Login Controller
exports.login = (req, res) => {
    return res.status(200).json({
        token: generateToken(req.user),
        msg: 'Login success',
        status: 'ok'
    })
}

exports.sendOtp = async (req, res, next) => {
    // Validate Phone number
    // Check if number exists in db
    // Send sms with verification code
    const phone = req.body.phone
    const isValid = naijaNumber.isValid(phone)
    if(!isValid) return res.status(422).json({msg: 'Invalid phone number.', status: 'err'})
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
            const response = await sms.send({ to, message, enque: true})
            const requestId = uniqid()
            user.secret = otpSecret
            user.requestId = requestId
            const s = await user.save()
            console.log('OTP IS ', code)
            console.log('User after sendOTP ', s)
            console.log('SMS response: ', response)
            return res.status(200).json({msg: 'Your OTP has been sent', status: 'ok', requestId})
        }
        else { return res.status(422).json({msg: 'Unregistered phone number.', status: 'err'})}
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

exports.verifyOtp = async (req, res, next) => {
    // Verify code
    // Log in user
    const { otp, requestId } = req.body
    if (!(!!otp && !!requestId)) {
        return res.status(422).json({msg: 'Resend OTP', status: 'err'})
    }
    try{
        let user = await User.findOne({ requestId })
        if(user){
            const totp = jsotp.TOTP(user.secret, 90)
            const isVerified = totp.verify(otp)
            // Verified OTP -> Log in user
            if(isVerified){
                // Reset secret and requestid
                user.secret = null
                user.requestId = null
                user = await user.save()
                console.log('User after verifyOTP:', user)
                req.user = user
                return next()
            }// No match
            return res.status(422).json({msg: 'Invalid OTP code', status: 'err'})

        }
        else { return res.status(422).json({msg: 'Invalid Request', status: 'err'})}
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}