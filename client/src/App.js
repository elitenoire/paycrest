import React, { Fragment } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Auth, { AuthProvider } from './context/Auth'
import NavigationBar from './components/NavigationBar'
import NavigationMenu from './components/NavigationMenu'
import Home from './components/Home'
// import Dashboard from './components/Dashboard'
import './scss/styles.scss'

const App = () => (
  <Router>
    <AuthProvider>
      <Fragment>
        <NavigationBar>
          <Auth>{NavigationMenu}</Auth>
          {/* <NavigationMenu /> */}
        </NavigationBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/get-started" render={() => <Home />}/>
          {/* <Route path ="/app" component={Dashboard} /> */}
        </Switch>
      </Fragment>
    </AuthProvider>
  </Router>
)

export default App