import React , { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import onClickOutside from "react-onclickoutside"

class NavigationBar extends Component  {
    state = {
        open : false
    }

    onToggle = () => (
        this.setState({ open: !this.state.open})
    )

    handleClickOutside = (cb) => {
        if(this.state.open){
            this.setState({ open: false})
        }
        if(typeof cb == 'function'){
            return cb()
        }
    }

    render() {
        const { open } = this.state
        const { location: { pathname }, children } = this.props

        return (
            <nav class="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <Link
                            class="navbar-item title is-marginless is-paddingless"
                            to="/"
                            onClick={this.handleClickOutside}
                        >
                            <p>PAY<span class="has-text-primary">CREST</span></p>
                        </Link>

                        {(pathname !== '/get-started') && <a
                            role="button"
                            class={`navbar-burger burger ${open ? 'is-active':''}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navMenu"
                            onClick={this.onToggle}
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>}
                    </div>

                    <div
                        id="navMenu"
                        class={`navbar-menu ${open ? 'is-active':''}`}
                    >
                        <div class="navbar-end">
                            {React.cloneElement(children, { pathname, onClose: this.handleClickOutside })}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
export default withRouter(onClickOutside(NavigationBar))