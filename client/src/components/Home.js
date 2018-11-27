import React from 'react';
import Form, { FormProvider } from '../context/Form'
import Auth from '../context/Auth'
import LandingPage from './LandingPage'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


const Home = ({location: {pathname }}) => {
  return (
    pathname === '/get-started'
      ? (<Auth>
        {({signup, login, loginOtp}) => (
          <FormProvider signup={signup} login={login} loginOtp={loginOtp}>
            <Form>
              {({ swapForm, ...state}) => (
                swapForm === 'login'
                  ? <LoginForm swapForm={swapForm} { ...state}/>
                  : <SignupForm swapForm={swapForm} { ...state}/>
              )}
            </Form>
          </FormProvider>
        )}
        </Auth>
      )
      : <LandingPage />
  )
}

export default Home
