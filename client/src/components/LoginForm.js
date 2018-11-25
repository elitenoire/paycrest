import React from 'react'
import FormLayout from './FormLayout'
import Toggle from "react-toggle-component"
import 'react-toggle-component/styles.css'


const OtpLogin = ({ showVerify, onInputChange, loginOtp, onSubmit }) => {
    showVerify = !showVerify
    return (
        <form id="loginOtp" onSubmit={onSubmit}>
            <div class="field">
                <div class="field has-addons">
                    <p class="control">
                        <a class="button is-null is-rounded">
                            +234
                        </a>
                    </p>
                    <p class="control is-expanded">
                        <input onChange={onInputChange} value={loginOtp.phone} name="phone" disabled={showVerify} value="5" class="input is-rounded" type="tel" placeholder="Eg: 08043492736" required/>
                    </p>
                </div>
                <p class="help has-text-primary">{`A code ${showVerify? 'has been':'will be'} sent to this number.`}</p>
            </div>

            {showVerify && (
                <div class="field">
                    <p class="control has-icons-left">
                        <input onChange={onInputChange} value={loginOtp.otp} name="otp" class="input is-rounded" type="text" placeholder="Code" required/>
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
            )}
            <div class="field">
                <div class="control">
                    <button class="button is-fullwidth is-primary is-rounded has-depth">
                    {showVerify ? 'Verify' : 'Send'}
                    </button>
                </div>
            </div>
            {showVerify && (
                <div class="field">
                    <div class="control">
                        <button class="button is-fullwidth is-primary is-rounded has-depth">
                        Cancel
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}

const PasswordLogin = ({error, onInputChange, login, onSubmit }) => {
    return (
        <form id="login" onSubmit={onSubmit}>
            <div class="field">
                <p class="control has-icons-left">
                    <input onChange={onInputChange} value={login.email} name="email" class="input is-rounded" type="email" placeholder="Email" required/>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control  has-icons-left">
                    <input onChange={onInputChange} value={login.password} name="password" class="input is-rounded" type="password" placeholder="Password" required/>
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            {error && <p class="help has-text-danger has-mb-2">{error}</p>}
            <div class="field">
                <div class="control">
                    <button class="button is-fullwidth is-primary is-rounded has-depth">
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
                    <Toggle className="toggle-switch" checked={viaOtp} onToggle={onToggle}/>
                </div>
            </div>
        </div>
    )
}

const LoginForm = ({error, swapForm, onSwap, viaOtp, login, loginOtp, onInputChange, showVerify, onToggle, onSubmit}) => {
    return (
        <FormLayout swapForm={swapForm} onSwap={onSwap}>
            <LoginPanel viaOtp={viaOtp} onToggle={onToggle}/>
            {viaOtp
                ? <OtpLogin error={error} loginOtp={loginOtp} showVerify={showVerify} onInputChange={onInputChange} onSubmit={onSubmit}/>
                : <PasswordLogin error={error} login={login} onInputChange={onInputChange} onSubmit={onSubmit}/>
            }
        </FormLayout>
    )
}

export default LoginForm