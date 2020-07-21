import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';

function PrivateRoute({ component: Component, ...rest }) {

    const { authTokens } = useAuth();

    return (
        <Route {...rest} render={props =>
            authTokens
                ? (<div className='background w-100' ><Navbar></Navbar><Component {...props} /><Footer></Footer></div>)
                : (<Redirect to='/login' />)
        } exact />
    )
}

export default PrivateRoute