import React from 'react'
import FormLayout from './FormLayout'


const SignupForm = ({busy, error, swapForm, onSwap, onInputChange, onSubmit, signup}) => {
    return (
        <FormLayout swapForm={swapForm} onSwap={onSwap}>
            <form id="signup" onSubmit={onSubmit}>
                <div class="field">
                    <p class="control has-icons-left">
                        <input
                            onChange={onInputChange}
                            value={signup.firstName}
                            name="firstName"
                            class="input is-rounded"
                            type="text"
                            placeholder="First Name"
                            required
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control is-expanded has-icons-left">
                        <input
                            onChange={onInputChange}
                            value={signup.lastName}
                            name="lastName"
                            class="input is-rounded"
                            type="text"
                            placeholder="Last Name"
                            required
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <div class="field has-addons">
                        <p class="control">
                            <a class="button is-null is-rounded">
                                +234
                            </a>
                        </p>
                        <p class="control is-expanded">
                            <input
                                onChange={onInputChange}
                                value={signup.phone}
                                name="phone"
                                class="input is-rounded"
                                type="tel"
                                placeholder="080XXXXXXXX"
                                required
                            />
                        </p>
                    </div>
                    <p class="help has-text-primary">Input with the first zero</p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input
                            onChange={onInputChange}
                            value={signup.email}
                            name="email"
                            class="input is-rounded"
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            required
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input
                            onChange={onInputChange}
                            value={signup.password}
                            name="password"
                            class="input is-rounded"
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            required
                            />
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                {error && <p class="help has-text-danger has-mb-2">{error}</p>}
                <div class="field">
                    <div class="control">
                        <button
                            class={`button is-fullwidth is-primary is-rounded has-depth ${busy?'is-loading':''}`}
                        >
                        Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </FormLayout>
    )
}

export default SignupForm