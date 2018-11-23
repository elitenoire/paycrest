import React, { createContext, Component } from 'react'
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
        isAuth: true
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
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export { AuthProvider }