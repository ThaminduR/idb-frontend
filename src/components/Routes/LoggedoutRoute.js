import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function LoggedoutRoute({ component: Component, ...rest }) {

    const { authTokens } = useAuth();

    return (
        <Route {...rest} render={props =>
            true
                ? (<Redirect to='/' />)
                : (<Component {...props} />)
        } />
    )
}

export default LoggedoutRoute