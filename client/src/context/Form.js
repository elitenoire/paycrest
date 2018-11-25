import React, { createContext, Component } from 'react'

const FormContext = createContext({})

export default FormContext.Consumer

const initialState = {
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
    state = initialState

    constructor() {
        super()
        this.onInputChange = this.onInputChange.bind(this)
        this.onSwap = this.onSwap.bind(this)
        this.onToggle = this.onToggle.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    // Switch between Login or Sign up Form
    onSwap() {
        const { swapForm } = this.state
        if(swapForm === 'signup') return this.setState({swapForm: 'login', signup: initialState.signup})
        if(swapForm === 'login') {
            return this.setState({
                swapForm: 'signup',
                login: initialState.login,
                loginOtp: initialState.loginOtp
            })
        }
    }
    // Switch Login between Otp or Password
    onToggle() {
        const { viaOtp } = this.state
        // Reset the two forms since I can't tell which one is dirty
        // if(!viaOtp) {
        //     return this.setState({viaOtp : !viaOtp, login: initialState.login})
        // }
        this.setState({
            viaOtp : !viaOtp,
            login: initialState.login,
            loginOtp: initialState.loginOtp
        })
    }
    // Handle Input Change
    onInputChange({ target: {value, name, form:{ id } }}) {
        // Temp fix: To clear form error after submission
        this.setState({
            [id]: {...this.state[id], [name]:value},
            error: ''
        })
    }
    // Handle Form submission
    async onSubmit(e) {
        console.log('Submitting form...')
        e.preventDefault()
        const formId = e.target.id
        if(formId === 'loginOtp') {}
        else {
            this.setState({busy: true})
            const data = {...this.state[formId]}
            console.log('Form data', data)
            //send data to backend
            // err is undefined for success and an object for error
            const err = await this.props[formId](data)
            if(err) return this.setState({busy: false, error: err.error || err.msg})
            // Reset form values
            this.setState({busy: false, error: '', [formId]: initialState[formId]})
        }
    }

    render(){
        const methods = {
            onInputChange: this.onInputChange,
            onSwap : this.onSwap,
            onToggle : this.onToggle,
            onSubmit: this.onSubmit
        }
        console.log(this.state)
        return (
            <FormContext.Provider value={{...this.state, ...methods}}>
                {this.props.children}
            </FormContext.Provider>
        )
    }
}

export { FormProvider }