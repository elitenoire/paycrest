import React from 'react';
import Form, { FormProvider } from '../context/Form'
import Auth from '../context/Auth'
import LandingPage from './LandingPage'
// import FormLayout from './FormLayout'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


const Home = ({location: {pathname }}) => {
  return (
    pathname === '/get-started'
      ? (<Auth>
        {({signup, login}) => (
          <FormProvider signup={signup} login={login}>
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
