import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function PrivateRoute({ component: Component, ...rest }) {

    const { authTokens } = useAuth();

    return (
        <Route {...rest} render={props =>
            true
                ? (<Component {...props} />)
                : (<Redirect to='/login' />)
        } />
    )
}

export default PrivateRoute