import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = ({ children }) => (
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <Link className="navbar-item title is-marginless" to="/">IRIS
            </Link>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navMenu" class="navbar-menu">
            <div class="navbar-end">
                {children}
            </div>
        </div>
    </nav>
)
export default NavigationBar