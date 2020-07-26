import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useAuth } from '../../services/AuthenticationService'
import { useHistory } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Login(props) {

    const history = useHistory()

    const [state, setState] = useState({
        username: "",
        password: "",
        rememberMe: false,
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

    const handleCheckboxChange = (e) => {
        const { id } = e.target
        const value = state[id]
        setState(prevState => ({
            ...prevState,
            [id]: !value
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
                "rememberMe": state.rememberMe
            }
            axios.post('/login', payload)
                .then(function (response) {
                    if (response.data.code === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Login successful.',
                            'errorMessage': ''
                        }))
                        setAuthTokens(response.data);
                        history.replace('/')

                    } else {
                        setState(prevState => ({
                            ...prevState,
                            'errorMessage': response.data.message,
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
                                <p className='welcome-txt'>Admin Login</p>
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
                                    <label>Remember Me </label>
                                    <div className="form-check form-check-inline ml-2"><input className="form-check-input" type="checkbox" checked={state.rememberMe} id="rememberMe" onChange={handleCheckboxChange} /></div>
                                    <br />
                                    <button className='btn btn-outline-light' type='submit' onClick={handleSubmitClick}>Login</button>
                                </form>
                                <div className="alert login-alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                                    {state.successMessage}
                                </div>
                                <div className="alert login-alert alert-danger mt-2" style={{ display: state.errorMessage ? 'block' : 'none' }} role="alert">
                                    {state.errorMessage}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer className='login-footer'></Footer>
        </div>
    )
}

export default Login