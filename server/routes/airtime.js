const express = require('express');
const airtimeRouter = express.Router();

const { airtime } = require('../services/africastalking')

// Send airtime
airtimeRouter.post('/send', async (req, res) => {
    const { to, currencyCode, amount } = req.body

    const airtimeRecipientList = to.split(',')
        .map(number => ({
            phoneNumber: '+234' + number.trim().substring(1),
            currencyCode,
            amount: Number(amount)
        }))


    const opts = { recipients: airtimeRecipientList}

    try {
        const response = await airtime.send(opts)
        console.log(response)
        res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
        //res.json(e.toString())
    }
})

module.exports = airtimeRouter