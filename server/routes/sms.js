const express = require('express');
const smsRouter = express.Router();

const { sms } = require('../services/africastalking')

// Send SMS
smsRouter.post('/send', async (req, res) => {
    let { to, message } = req.body
    to = '+234' + to.trim().substring(1)

    try{
        const response = await sms.send({ to, message, enque: true})
        console.log(response)
        res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
        //res.json(e.toString())
    }
})