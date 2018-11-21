const { AT_API_KEY, AT_USERNAME } = require('../config/keys')
const AT_CONFIG = {
    username: AT_USERNAME,
    apiKey: AT_API_KEY
}
const AfricasTalking = require('africastalking')(AT_CONFIG);


module.exports = {
    airtime: AfricasTalking.AIRTIME,
    sms: AfricasTalking.SMS,
}