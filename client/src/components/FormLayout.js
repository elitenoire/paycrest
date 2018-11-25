import React from 'react'

const config = {
    login : {
        title: 'LOGIN',
        text: "Don't have an account?",
        action: 'Sign up here'
    },
    signup: {
        title: 'SIGN UP',
        text: 'Already have an account?',
        action: 'Login here'
    }
}

const FormLayout = ({children, swapForm, onSwap}) => {
    return (
        <section class="columns is-centered is-clipped">
            {/* <div class="columns is-centered"> */}
                <div class="column is-half-tablet is-one-third-desktop has-text-centered has-mx-5">
                    <div class="container is-fluid">
                        <h3 class="title is-4 is-marginless has-text-grey">{config[swapForm].title}</h3>
                        <div class="level is-marginless">
                            <div class="level-item">
                                <p class="subtitle is-6 has-text-grey">{config[swapForm].text}</p>
                            </div>
                            <div class="level-item">
                                <button
                                    class="button has-text-link is-text"
                                    onClick={onSwap}
                                >
                                    {config[swapForm].action}
                                </button>
                            </div>
                        </div>
                        <div class="box is-rounded add-border">
                            {children}
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </section>
    )
}

export default FormLayout