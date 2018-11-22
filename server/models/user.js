const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const naijaNumber = require('naija-phone-number')
const { Schema } = mongoose


const userSchema = new Schema({
    firstName: { type: String, trim: true},
    lastName: { type: String, trim: true},
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: isEmail,
            message: '{VALUE} is not valid',
            isAsync: false
        }
    },
    password: String,
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: naijaNumber.isValid,
            message: '{VALUE} is not a valid phone number!'
        }
    },
    isVerified: { type: Boolean, default: false},
    secret: String,
    requestId: String,
}, { timestamps: true })

// Encrypt password (salt and hash) pre-save hook
userSchema.pre('save', async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
    catch(err) {
        return next(err)
    }
})

// Method to decrypt and compare attempted password to stored encrypted user password
userSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    }
    catch(err) {
        return err
    }
}

// Model class
const User = mongoose.model('users', userSchema)

// Model export
module.exports = User


//mongoose.model('users', userSchema)
