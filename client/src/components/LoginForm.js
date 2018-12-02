import React, { Fragment } from 'react'
import FormLayout from './FormLayout'


const OtpLogin = ({ busy, error, showVerify, onInputChange, loginOtp, onSubmit, onCancel }) => {
    return (
        <Fragment>
            <form id="loginOtp" onSubmit={onSubmit}>
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
                                value={loginOtp.phone}
                                name="phone"
                                class="input is-rounded"
                                type="tel"
                                placeholder="080XXXXXXXX"
                                disabled={showVerify}
                                required
                            />
                        </p>
                    </div>
                    {!error && <p class="help has-text-primary">{`A code ${showVerify? 'has been':'will be'} sent to this number.`}</p>}
                    {error && <p class="help has-text-danger has-mb-2">{error}</p>}
                </div>

                {showVerify && (
                    <div class="field">
                        <p class="control has-icons-left">
                            <input
                                onChange={onInputChange}
                                value={loginOtp.otp}
                                name="otp"
                                class="input is-rounded"
                                type="text"
                                placeholder="Code"
                                required
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                )}
                <div class="field">
                    <div class="control">
                        <button class={`button is-fullwidth is-primary is-rounded has-depth ${busy?'is-loading':''}`}>
                        {showVerify ? 'Verify' : 'Send'}
                        </button>
                    </div>
                </div>
                {showVerify && (
                    <div class="field">
                        <div class="control">
                            <button
                                type="button"
                                class="button is-fullwidth is-primary is-rounded has-depth"
                                onClick={onCancel}
                            >
                            Cancel
                            </button>
                        </div>
                    </div>
                )}
            </form>
        {loginOtp.code && (
            <article class="message is-small is-warning  has-mt-5">
                <div class="message-body">
                    <p>Your code is <strong>{loginOtp.code}</strong>.</p>
                    <p>The sms service is temporarily disabled.</p>
                </div>
            </article>
        )}
        </Fragment>
    )
}

const PasswordLogin = ({busy, error, onInputChange, login, onSubmit }) => {
    return (
        <form id="login" onSubmit={onSubmit}>
            <div class="field">
                <p class="control has-icons-left">
                    <input
                        onChange={onInputChange}
                        value={login.email}
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
                        value={login.password}
                        name="password"
                        class="input is-rounded"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
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
                    <button class={`button is-fullwidth is-primary is-rounded has-depth ${busy?'is-loading':''}`}>
                    Login
                    </button>
                </div>
            </div>
        </form>
    )
}

const LoginPanel = ({viaOtp, onToggle}) => {
    return (
        <div class="level">
            <div class="level-left">
                <div class="level item">
                    <p class="subtitle is-7">
                        Login by
                        <span class="tag is-info is-tiny">{viaOtp?'Otp':'Password'}</span>
                    </p>
                </div>
            </div>
            <div class="level-right">
                <div class="level item">
                    <div class="field">
                        <input
                            type="checkbox"
                            id="login-switch"
                            class="switch is-rounded is-outlined"
                            checked={viaOtp}
                            onChange={onToggle}
                        />
                        <label htmlFor="login-switch" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const LoginForm = ({swapForm, onSwap, viaOtp, login, loginOtp, showVerify, onToggle, onCancel, ...rest}) => {
    return (
        <FormLayout swapForm={swapForm} onSwap={onSwap}>
            <LoginPanel viaOtp={viaOtp} onToggle={onToggle}/>
            {viaOtp
                ? <OtpLogin loginOtp={loginOtp} showVerify={showVerify} onCancel={onCancel} {...rest}/>
                : <PasswordLogin login={login} {...rest} />
            }
        </FormLayout>
    )
}

export default LoginForm