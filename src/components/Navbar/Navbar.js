import React from 'react'
import './Navbar.css';
import { useAuth } from '../../services/AuthenticationService';

function NavigationBar(props) {

    const { setAuthTokens } = useAuth();

    function logout() {
        setAuthTokens();
    }

    return (
        <nav className={"navbar navbar-expand-md navbar-dark fixed-top "}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mr-2">
                    <li className="nav-item active mr-2">
                        <button type="button" className="btn btn-outline-light" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationBar