import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './context/Auth'
import SecureRoute from './components/SecureRoute'
import NavigationBar from './components/NavigationBar'
import NavigationMenu from './components/NavigationMenu'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import './scss/styles.scss'

const App = () => (
  <Router>
    <AuthProvider>
      <Fragment>
        <NavigationBar>
          <NavigationMenu />
        </NavigationBar>
          <Switch>
            <Route exact path="/" component={Home} />
            <SecureRoute path="/get-started" redirect="/app" component={Home}/>
            <SecureRoute path ="/app" redirect="/get-started" component={Dashboard} />
          </Switch>
      </Fragment>
    </AuthProvider>
  </Router>
)

export default App