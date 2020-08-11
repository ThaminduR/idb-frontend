import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';

function PrivateRoute({ component: Component, ...rest }) {

    const { authTokens } = useAuth();

    const divStyle = {
        width: '100%',
    }
    return (
        <Route {...rest} render={props =>
            authTokens
                ?
                (authTokens.code === 200)
                    ?
                    (<div className='background' style={divStyle}><Navbar></Navbar><Component {...props} /><Footer></Footer></div>)
                    : (authTokens.code === 401)
                        ? (<Redirect to='/Error' />)
                        : (<Redirect to='/Login' />)
                : (<Redirect to='/Login' />)
        } exact />
    )
}

export default PrivateRoute