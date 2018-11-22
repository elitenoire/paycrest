const africasTalking = require('africastalking')
const { AT_API_KEY, AT_USERNAME } = require('../config/keys')

//Initialize AT
const AfricasTalking = new africasTalking({
    username: AT_USERNAME,
    apiKey: AT_API_KEY
}, {debug: true})


module.exports = {
    airtime: AfricasTalking.AIRTIME,
    sms: AfricasTalking.SMS,
}