import React, { useState, useEffect } from 'react'
import './ErrorPage.css'
import { useAuth } from '../../services/AuthenticationService'
import { useHistory } from 'react-router-dom'

function ErrorPage(props) {

    const { authTokens, setAuthTokens } = useAuth();
    const history = useHistory()

    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {

        if (timeLeft === 0) {
            setTimeLeft(null)
        }

        if (!timeLeft) return;

        const timer = setInterval(() => {

            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    if (!timeLeft) {
        setTimeout(() => {
            if (authTokens.code === 401) {
                setAuthTokens('')
                history.replace('/login')
            }
        }, 1000)
    }

    const redirectToSite = (e) => {
        e.preventDefault()
        history.replace('/')
    }

    return (
        <div className='background-error'>
            <div className='row'>
                <div className='col error-con'>
                    <p className='text-error-h'>:(</p>
                    <p className='text-error-p'>{(authTokens.code === 401) ? "It Seems that You're Unauthorized. Please Login Again" : authTokens.message}</p>
                    <p>{(timeLeft) ? ("You'll redirected in " + timeLeft) : "Redirecting..."}</p>
                    <div className='btn btn-404' onClick={redirectToSite}>Back to Site</div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage