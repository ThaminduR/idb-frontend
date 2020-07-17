import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { API_BASE_URL } from '../../constants/constants'
import { useAuth } from '../../services/AuthenticationService'
import { Redirect } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Login(props) {

    const [state, setState] = useState({
        username: "",
        password: "",
        successMessage: null,
        errorMessage: null
    })

    const { setAuthTokens } = useAuth();

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()

    }

    const sendDetailsToServer = () => {
        if (state.username.length && state.password.length) {
            const payload = {
                "username": state.username,
                "password": state.password,
            }
            axios.post(API_BASE_URL + 'login', payload)
                .then(function (response) {
                    if (response.data.code === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Login successful.',
                            'errorMessage': ''
                        }))
                        setAuthTokens(response.data);
                        return <Redirect to='/' />

                    } else {
                        setState(prevState => ({
                            ...prevState,
                            'errorMessage': response.data.failure,
                            'successMessage': ''
                        }))
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setState(prevState => ({
                ...prevState,
                'errorMessage': 'Please enter valid credentials',
                'successMessage': ''
            }))
        }
    }

    // const redirectToForgotPassword = () => {
    //     props.updateTitle('Login')
    //     props.history.push('/register');
    // }

    return (
        <div className='bg-img'>
            <div className='login-overlay'>
                <div className='container '>
                    <div className=' container login-column'>
                        <div className='card login-card'>
                            <div className='col-12'>
                                <p className='welcome-txt'>Welcome</p>
                                <form>
                                    <div className="form-group text-center">
                                        <input type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Username"
                                            value={state.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group text-center">
                                        <input type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={state.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-outline-light" onClick={handleSubmitClick}>
                                        Login
                                </button>
                                </form>
                                <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                                    {state.successMessage}
                                </div>
                                <div className="alert alert-danger mt-2" style={{ display: state.errorMessage ? 'block' : 'none' }} role="alert">
                                    {state.errorMessage}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Login