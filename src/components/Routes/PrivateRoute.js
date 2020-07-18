import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import Navbar from '../Navbar/Navbar'

function PrivateRoute({ component: Component, ...rest }) {

    const { authTokens } = useAuth();

    return (
        <Route {...rest} render={props =>
            authTokens
                ? (<div className='background'><Navbar></Navbar><Component {...props} /></div>)
                : (<Redirect to='/login' />)
        } exact />
    )
}

export default PrivateRoute