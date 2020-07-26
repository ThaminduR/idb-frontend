import React from 'react'
import { useHistory } from 'react-router-dom'
import './Page404.css'

function Page404(props) {

    const history = useHistory()

    const redirectToSite = (e) => {
        e.preventDefault()
        history.replace('/')
    }

    return (
        <div className='background-404'>
            <div className='row'>
                <div className='col-lg-6'>
                    <img className='img-fluid img-404' alt='404' src={require('../../assets/404.png')} />
                </div>
                <div className='col-lg-6 error-404'>
                    <p className='text-404-h'>hmm...</p>
                    <p className='text-404-p'>It seems that you're lost in the wild</p>
                    <div className='btn btn-404' onClick={redirectToSite}>Back to Site</div>
                </div>
            </div>
        </div>
    )
}

export default Page404