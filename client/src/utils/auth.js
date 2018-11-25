import axios from 'axios'
import jwt from 'jsonwebtoken'

const client = axios.create({
    baseURL: '/auth'
});

const auth = {}

// client-to-server async helpers
const postHelper = async (payload, route) => {
    console.log('Making post api request..')
    try{
        console.log('Send to ', route, payload)
        const response = await client.post(route, payload)
        return { response }
    }
    catch(err){
        if(err.response){
            console.log('In client', err.response)
            return {error : err.response.data}
        }
        console.log('In client , err is', err)

        return {error : 'Check network connection or please refresh'}
    }
}
auth.login = payload => postHelper(payload,'/login')
auth.signup = payload => postHelper(payload,'/signup')
auth.sendOtp = payload => postHelper(payload,'/sendOtp')
auth.verifyOtp = payload => postHelper(payload,'/verifyOtp')


// client-localStorage helpers

// Retrieve token from store
auth.getTokenFromStorage = (key = 'token') => {
    return localStorage.getItem(key) || null
}

// Check if user is authenticated
auth.isUserAuthenticated = (key = 'token') => {
    const decodedToken = auth.decodeToken(key)
    return decodedToken && (decodedToken.exp > Date.now() / 1000)
}

// Authenticate user
auth.authenticateUser = (token, key = 'token') => {
    localStorage.setItem(key, token)
}

// deauthenticate user -> Log Out
auth.deauthenticateUser = (key = 'token') => {
    localStorage.removeItem(key)
}

// Decode token
auth.decodeToken = (key = 'token') => {
    return jwt.decode(auth.getTokenFromStorage(key)).payload || null
}

export { auth }