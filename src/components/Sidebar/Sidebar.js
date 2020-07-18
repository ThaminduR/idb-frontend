import React from 'react'
import axios from 'axios'
import './Sidebar.css';
import { DEV_NAME } from '../../constants/constants';
import { Redirect } from 'react-router-dom';

function Sidebar(props) {

    const logout = () => {
        axios.get('/logout')
        localStorage.clear()
        return <Redirect to='/login'/>
    }

    return (
        <React.Fragment>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className='container user-info'>
                        <div className='row justify-content-center'>
                            <div className='col-sm'>
                                <div className="user-pic">
                                    <img className="img-responsive img-rounded" src={require("../../assets/user.jpg")}
                                        alt="User" />
                                </div>
                            </div>
                            <div className='col-sm mt-2'>
                                <span className="user-name">Admin</span>
                                <br />
                                <span className="user-status">
                                    <i className="fa fa-circle"></i>
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item"><a href="/">Dashboard</a></li>
                        <li className="list-group-item"><a href="/">Search Company</a></li>
                        <li className="list-group-item"><a href="/">Add Survey Data</a></li>
                        <li className="list-group-item"><a href="/">View Survey Data</a></li>
                    </ul>
                </div>
                <div className="sidebar-footer">
                    <button className='btn btn-outline-light logout-btn mb-4 mt-4' onClick={logout}>Logout</button>
                    <p className='developer-text'>Developed By {DEV_NAME}</p>
                </div>
            </nav>
        </React.Fragment>
    )
}
export default Sidebar