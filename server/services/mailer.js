const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { compile } = require('handlebars')
const mjml2html = require('mjml').default
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text')
const { MAIL_HOST,MAIL_PORT, MAIL_PASS, MAIL_USER, MAIL_FROM } = require('../config/keys')

const readFile = promisify(fs.readFile)
//const readdir = promisify(fs.readdir)

// Mail Transport Service
const transporter = nodemailer.createTransport({
    // service: 'google',
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: { user: MAIL_USER, pass: MAIL_PASS },
    logger: true,
    tls: { rejectUnauthorized: false }
})

// Load and compile email template
const compileTemplate = async (templateName, data) => {
    const templatePath = path.join(__dirname, '../templates/mail/', `${templateName}.mjml`)
    try {
        const templateString = await readFile(templatePath, 'utf8')
        const mjmlTemplate = compile(templateString)(data)
        console.log(mjmlTemplate)
        const { errors, html } = mjml2html(mjmlTemplate)
        if (errors){
            console.log(errors.map(e => e.formattedMessage).join("\n"));
        }
        return html
    }
    catch(err) {
        //return err
        console.log(err)
    }

}

// Mailer Core
const sendEmail = async ({ from, to, subject, data, templateName }) => {
    // mailer options
    const mailOptions = {
        from : from || MAIL_FROM,
        to,
        subject : subject || data.subject
    }
    // Add subject as data if needed
    data.subject = subject
    // Generate email html and text format
    try {
        const html = await compileTemplate(templateName, data)
        const text = htmlToText.fromString(html, {wordwrap: 80});
        // // promisified mail sending
        return new Promise((resolve, reject) => {
            transporter.sendMail({...mailOptions, html, text }, (err, info) => {
                if(err) reject(err)
                //nodemailer response
                else resolve(info)
                }
            )
        })
    }
    catch(err) {
        return err
    }
}

module.exports = { sendEmail }
