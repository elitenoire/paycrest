import React, { createContext, Component } from 'react'
import { auth } from '../utils'

// Initialize with persisted auth state from local storage
const AuthContext = createContext({})

export default AuthContext.Consumer

class AuthProvider extends Component {
    state = {
        user: auth.decodeToken() || {},
        isAuth: auth.isUserAuthenticated()
    }

    constructor() {
        super()
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.signup = this.signup.bind(this)
        this.loginOtp = this.loginOtp.bind(this)
    }

    async signup(info) {
        const { response, error } = await auth.signup(info)
        if(response){
            //TODO: Don't authenticate but redirect to login
            // - Response has a msg to alert user of verification email sent
            // - Display msg and delay redirect (by not setting isAuth promptly)
            const { token, name } = response.data
            // Persist token to local storage
            auth.authenticateUser(token)
            // Update auth state
            return this.setState({isAuth: true, user: { name }})
            // return response.data
        }
        return { error }
    }

    async login(info) {
        // Make login request to api
        const { response, error } = await auth.login(info)
        if(response){
            const { token, name } = response.data
            // save token to local storage
            auth.authenticateUser(token)
            // Update auth state
            return this.setState({isAuth: true, user: { name }})
        }
        return { error }
    }

    async loginOtp(info, action) {
        const { response, error } = await auth[action](info)

        if(response){
            const { token, name, requestId, code } = response.data
            if(token){
                auth.authenticateUser(token)
                return this.setState({isAuth: true, user: { name }})
            }
            return  { requestId, code }
        }
        return { error }
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
            <AuthContext.Provider value={{
                ...this.state,
                signup: this.signup,
                login: this.login,
                loginOtp: this.loginOtp,
                logout: this.logout
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export { AuthProvider }