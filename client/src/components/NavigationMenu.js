import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../context/Auth'

// Link Button
const LinkButton = ({label, to, color, extraClass, onClick}) => (
    <Link
        className={`button is-${color || 'primary'} is-outlined is-rounded ${extraClass} `}
        to={to}
        onClick={onClick}
    >
    {label}
    </Link>
)

// Action Button
const ActionButton = ({label, onClick, onClose, noAction}) => (
    <button
        class={`button is-primary is-${noAction?'null':'outlined'} is-rounded`}
        onClick={onClick}
    >
    {label}
    </button>
)


const NavigationMenu = ({ pathname, onClose }) => (
    <Auth>
        {({ isAuth, user, logout }) => (
        <div class="navbar-item">
            {
                isAuth && (pathname === '/') && (
                    <div class="buttons">
                        <LinkButton to='/app' onClick={onClose} label='Visit App' color='text' extraClass='has-text-primary'/>
                        <ActionButton label='LogOut' onClick={() => onClose(logout)}/>
                    </div>
                )
            }
            {
                isAuth && (pathname === '/app') && (
                    <div class="buttons">
                        <ActionButton label={`Hi ${user.firstName || 'User'}`} noAction/>
                        <ActionButton label='LogOut' onClick={() => onClose(logout)}/>
                    </div>
                )
            }
            {
                !isAuth && (pathname === '/') && (
                    <LinkButton to='/get-started' label='Login/SignUp' onClick={onClose} />
                )
            }
        </div>
        )}
    </Auth>
)

export default NavigationMenu