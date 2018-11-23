import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../utils'

// Link Button
const LinkButton = ({label, to, color}) => (
    <Link 
        className={`button is-${color || 'primary'} is-outlined is-rounded has-text-primary`}
        to={to}
    >
    {label}
    </Link>
)

// Action Button
const ActionButton = ({label, onClick, noAction}) => {
    return (
        <button 
            class={`button is-primary is-${noAction?'null':'outlined'} is-rounded`}
            onClick={onClick}
        >
        {label}
        </button>
    )
}

// Methods
const handleLogOut = (history) => {
    auth.deauthenticateUser()
    // Redirect to '/'
    history.replace('/')
}

const NavigationMenu = (props) => {
    const { history, location: {pathname}, isAuth, user } = props
    console.log('Props in Navmenu ', props)
    return (
        <div class="navbar-item">
            {
                isAuth && (pathname === '/') && (
                    <div class="buttons">
                        <LinkButton to='/app' label='Visit App' color='text'/>
                        <ActionButton label='LogOut' onClick={() => handleLogOut(history)}/>
                    </div>
                )
            }
            {
                isAuth && (pathname === '/app') && (
                    <div class="buttons">
                        <ActionButton label={`Hi ${user.firstName || 'User'}`} noAction/>
                        <ActionButton label='LogOut' onClick={() => handleLogOut(history)}/>
                    </div>
                )
            }
            {
                !isAuth && (pathname === '/') && (
                    <LinkButton to='/get-started' label='Login/SignUp' />
                )
            }
        </div>
    )
}

export default withRouter(NavigationMenu)