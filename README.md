# Paycrest

Paycrest is a mobile wallet for performing seamless e-transactions.

## Introduction

> A web app for the 2018 Abuja Devfest challenge in partnership with AfricasTalking mobile evolved into more. It makes reference to popular mobile money solutions and doesn't claim to be an original idea.

### Prequistes

Should have latest version of node and npm installed.
Certain aspects of server-side code depends on features in node v10.13 and above

### Getting Started

```js
// Clone repo
git clone 'insert-git-repo-url-here'
// Install server node_modules
npm install
// Running in dev mode requires a dev.js file to configure variables
// Make a dev.js file in server/config like this
module.exports = {
    MONGO_URI: 'your-db-uri',
    AT_API_KEY : 'your-africastalking-key',
    AT_USERNAME : 'your-africastalking-username',
    JWT_SECRET : 'your-secret',
    ...
}
// switch to client-side
cd client
// Install client node_modules
yarn add
// switch back to server-side
cd ..
// start up
npm run dev
```

#### Built With

* NodeJs / express - Server framework
* Mongodb / Mongoose - Database
* React / CRA - client UI framework
* React Context API - State management / UI interaction
* React Router v4 - Client Routing
* Bulma - Styling UI
* JWT /jsonwebtoken - Authentication
* Git / Heroku - Deployment
* Africa's Talking API - Third-party api
