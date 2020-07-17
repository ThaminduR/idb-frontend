import React from 'react'
import './Footer.css';
import { DEV_NAME } from '../../constants/constants';

function Footer(props) {
    return (
        <footer className='fixed-bottom'>
            <p className='footer-text'>IDB DBMS - {new Date().getFullYear()} <br></br> Developed By {DEV_NAME}</p>
        </footer>
    )
}
export default Footer