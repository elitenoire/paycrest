import axios from 'axios'
import jwt from 'jsonwebtoken'

const client = axios.create({
    baseURL: '/auth'
});

const auth = {}

// client-to-server async helpers
auth.login = async (user) => {
    try{
        const response = await client.post('/login', user)
        return { response }
    }
    catch(err){
        if(err.response){
            return {error : err.response.data}
        }
        return {error : {success : 'false' , _error : 'Check network connection or please refresh'}}
    }
}


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
auth.authenticateUser = (key = 'token', token) => {
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