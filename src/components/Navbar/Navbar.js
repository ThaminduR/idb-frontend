import React from 'react'
import axios from 'axios'
import { useAuth } from '../../services/AuthenticationService'
import './Navbar.css';

function NavigationBar(props) {

    const { setAuthTokens } = useAuth();

    const logout = (e) => {
        e.preventDefault()
        axios.get('/logout')
        setAuthTokens('')
    }

    // const testBackend = (e) => {
    //     e.preventDefault()
    //     axios.get('/admin/test').then(function (response) {
    //         setAuthTokens(response.data)
    //     })
    // }

    return (
        <nav className={"navbar navbar-expand-md navbar-dark"}>
            <div className='row'>
                <div className='col-6'>
                    <img className="img-responsive img-rounded" src={require("../../assets/user2.png")}
                        alt="User" />
                </div>
                <div className='col-6'>
                    <span className="user-name">Administrator</span>
                    <br />

                    <span className="user-status">
                        <div className='row'>
                            <i className="fa fa-circle mt-1"></i>
                            <span>Online</span>
                        </div>

                    </span>
                </div>
            </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mr-2">
                    {/* <li className="nav-item active ml-2 mt-2 mr-2">
                        <div className='btn btn-outline-light' onClick={testBackend}>Test Backend</div>
                    </li> */}
                    {/* <li className="nav-item active ml-2 mt-2 mr-2">
                        <a href="/Dashboard">Dashboard</a>
                    </li> */}
                    <li className="nav-item active ml-2 mt-2 mr-2">
                        <a href="/AllRecords">All Records</a>
                    </li>
                    <li className="nav-item active ml-2 mt-2 mr-2">
                        <a href="/NewSurvey">Add Data</a>
                    </li>
                    <li className="nav-item active ml-2 mt-2 mr-2">
                        <a href="/DataAnalysis">Data Analysis</a>
                    </li>
                    <li className="nav-item active ml-2 mt-2 mr-2">
                        <a href="/DeletedRecords">Deleted Records</a>
                    </li>
                    <li className="nav-item active ml-2 mr-2">
                        <button type="button" className="btn btn-outline-light" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationBar