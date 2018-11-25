import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../context/Auth';


const SecureRoute = ({ component: Component, redirect, ...rest }) => (
    <Auth>
        {({ isAuth }) => (
            <Route
                render={
                    props => {
                        let doneAuth = isAuth
                        if (props.location.pathname === '/get-started') doneAuth = !isAuth
                        return (
                            doneAuth
                            ? <Component {...props} />
                            : <Redirect to={redirect} />
                        )
                    }
                }
                {...rest}
            />
        )}
    </Auth>
);
export default SecureRoute;