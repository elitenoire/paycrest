import React, { createContext, Component } from 'react'
// import { withRouter } from 'react-router-dom'

import { auth } from '../utils'

// Initialize with persisted auth state from local storage
const AuthContext = createContext({
    // user: auth.decodeToken() || {},
    // isAuth: auth.isUserAuthenticated()
})

export default AuthContext.Consumer

class AuthProvider extends Component {
    state = {
        user: {},
        isAuth: false
    }

    constructor() {
        super()
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.signup = this.signup.bind(this)
    }

    async signup(info) {
        const { response, error } = await auth.signup(info)
        if(response){
            //TODO: Don't authenticate but redirect to login
            // - Response has a msg to alert user of verification email sent
            // - Display msg and delay redirect (by not setting isAuth promptly)
            const { token, name } = response.data
            console.log('Signup response', response.data, response)
            // Persist token to local storage
            auth.authenticateUser(token)
            // Update auth state
            return this.setState({isAuth: true, user: { name }})
            // return response.data
        }
        console.log('Signup error', error)
        return error
    }

    async login(info) {
        // Make login request to api
        const { response, error } = await auth.login(info)
        if(response){
            console.log('Login response ', response.data)
            const { token, name } = response.data
            // save token to local storage
            auth.authenticateUser(token)
            // Update auth state
            return this.setState({isAuth: true, user: { name }})
        }
        console.log('Login error', error)
        return error
    }

    logout() {
        // remove token from local storage
        auth.deauthenticateUser()
        // reset state
        this.setState({isAuth: false, user: {}})
    }

    componentDidUpdate() {
        // this.checkAuthentication()
    }

    componentDidMount() {
        // this.checkAuthentication()
    }

    checkAuthentication() {
        const isAuth = auth.isUserAuthenticated();
        if (isAuth !== this.state.isAuth) {
          const user = auth.decodeToken() || {}
          this.setState({ isAuth, user });
        }
    }    

    render(){
        return (
            <AuthContext.Provider value={
                {...this.state, 
                login: this.login, 
                logout: this.logout,
                signup: this.signup
                }
            }>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export { AuthProvider }