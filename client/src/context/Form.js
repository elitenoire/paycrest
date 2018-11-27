import React, { createContext, Component } from 'react'

const FormContext = createContext({})

export default FormContext.Consumer

const formDefaults = {
    viaOtp: false,
    showVerify: false,
    busy: false,
    swapForm: 'signup',
    error: '',
    signup: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    },
    login: {
        email: '',
        password: ''
    },
    loginOtp: {
        phone: '',
        otp: '',
        requestId: ''
    }
}

class FormProvider extends Component {
    state = formDefaults

    // Switch between Login or Sign up Form
    onSwap = () => {
        const { swapForm } = this.state
        if(swapForm === 'signup') {
            return this.setState({
                ...formDefaults,
                swapForm: 'login'
            })
        }
        if(swapForm === 'login') {
            return this.setState({
                ...formDefaults,
                swapForm: 'signup'
            })
        }
    }
    // Switch Login between Otp or Password
    onToggle = () => (
        this.setState({
            ...formDefaults,
            viaOtp : !this.state.viaOtp,
            swapForm: 'login'
        })
    )
    // Handle Input Change
    onInputChange = ({ target: {value, name, form:{ id } }}) => (
        // Temp fix: To clear form error after submission
        this.setState({
            [id]: {...this.state[id], [name]:value},
            error: ''
        })
    )
    // Handle Form submission
    onSubmit = async e => {
        e.preventDefault()
        this.setState({ busy: true, error: '' })

        const formId = e.target.id
        let data = {...this.state[formId]}
        let action = null

        const { showVerify, loginOtp: { phone, otp, requestId }} = this.state
        if(formId === 'loginOtp') {
            action = showVerify ? 'verifyOtp' : 'sendOtp'
            data = showVerify ? { otp, requestId } :  { phone }
        }
        //send data to backend
        // err is undefined for success and an object for error
        const { error: err, requestId: RID } = await this.props[formId](data, action) || {}
        if(err) return this.setState({ busy: false, error: err.error || err.msg })

        // No error from server -> login/signup okay
        // Reset form values
        if(formId === 'loginOtp' && !showVerify){
            return this.setState({
                busy: false,
                error: '',
                showVerify: true,
                loginOtp :{...this.state.loginOtp, requestId: RID}
            })
        }

        // No need to reset form values as Form.js gets unmounted when Auth state is true
        // Or, use a flag to conditionally prevent setting state when Form.js will unmount
        // this.setState({busy: false, error: '', showVerify: false, [formId]: formDefaults[formId]})
    }

    // Cancel Login via Otp
    onCancel = () => (
        this.setState({ ...formDefaults, swapForm: 'login' })
    )

    render() {
        const methods = {
            onInputChange: this.onInputChange,
            onSwap : this.onSwap,
            onToggle : this.onToggle,
            onSubmit: this.onSubmit,
            onCancel: this.onCancel
        }
        return (
            <FormContext.Provider value={{...this.state, ...methods}}>
                {this.props.children}
            </FormContext.Provider>
        )
    }
}

export { FormProvider }