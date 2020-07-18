import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import Sidebar from '../Sidebar/Sidebar'

function PrivateRoute({ component: Component, ...rest }) {

    const { authTokens } = useAuth();

    return (
        <Route {...rest} render={props =>
            authTokens
                ? (<div><Sidebar></Sidebar><Component {...props} /></div>)
                : (<Redirect to='/login' />)
        } />
    )
}

export default PrivateRoute