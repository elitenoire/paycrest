import React from 'react'
import { Link, withRouter  } from 'react-router-dom'

// Link Button
const LinkButton = ({label, to, color, extraClass}) => (
    <Link
        className={`button is-${color || 'primary'} is-outlined is-rounded ${extraClass} `}
        to={to}
    >
    {label}
    </Link>
)

// Action Button
const ActionButton = ({label, onClick, noAction}) => (
    <button
        class={`button is-primary is-${noAction?'null':'outlined'} is-rounded`}
        onClick={onClick}
    >
    {label}
    </button>
)


const NavigationMenu = ({ location: { pathname }, isAuth, user, logout }) => (
    <div class="navbar-item">
        {
            isAuth && (pathname === '/') && (
                <div class="buttons">
                    <LinkButton to='/app' label='Visit App' color='text' extraClass='has-text-primary'/>
                    <ActionButton label='LogOut' onClick={logout}/>
                </div>
            )
        }
        {
            isAuth && (pathname === '/app') && (
                <div class="buttons">
                    <ActionButton label={`Hi ${user.firstName || 'User'}`} noAction/>
                    <ActionButton label='LogOut' onClick={logout}/>
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

export default withRouter(NavigationMenu)