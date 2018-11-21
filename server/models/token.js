const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types
const crypto = require('crypto')
const { sendEmail } = require('../services/mailer')


// Verification token
const tokenSchema = new Schema({
    _userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    token: {type: String, required: true},
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 86400
    }
})

tokenSchema.methods.sendVerificationToken = async function(user, baseUrl) {
    const verificationToken = this
    try {// create verification token
        verificationToken.set('token', crypto.randomBytes(16).toString('hex') )
        const token = await verificationToken.save()

        const mailOptions = {
            to: user.email,
            subject: 'Confirm your Iris Messenger account with us',
            data: {
                name: user.firstName || 'Newbie',
                url: `${baseUrl}/confirm/${token.token}`
            },
            templateName: 'signup-confirm'
        }

        const info = await sendEmail(mailOptions)
        console.log(`Message sent: #${info.messageId} ${info.response}`)
        return
    }
    catch(err) {
        //return err
        console.log(err)
    }
}


// Model class
const Token = mongoose.model('tokens', tokenSchema)

// Model export
module.exports = Token