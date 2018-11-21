const express = require('express')
const bodyParser= require('body-parser');

const { requireAuth } = require('./middlewares/auth')
const { MONGO_URI } = require('./config/keys')

const mongoose = require('mongoose')
//create mongoose Promises using es6 Promise library
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongodb, success!')
    })
    .catch(error => console.warn('Warning!', error))

const PORT =  process.env.PORT || 5000

//Routers
const authRouter = require('./routes/auth')
const airtimeRouter = require('./routes/airtime')

const app = express()

// tell the app to parse HTTP body messages and Html Form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json() );

// Handle login route
// app.post('/auth/login', authLogin )

// tell the app to look for static files in these directories
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
// Register and login users
app.use('/auth', authRouter)
// Restrict api access to authorized users
app.all('/api/*', requireAuth);
// Handle routes
app.use('/api/airtime', airtimeRouter)


if (process.env.NODE_ENV === 'production') {
    //serve index.html for unrecognized route -> react-router
    const path = require('path')
    app.get('*' , (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))