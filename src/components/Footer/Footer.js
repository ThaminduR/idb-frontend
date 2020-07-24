import React from 'react'
import './Footer.css';
import { DEV_NAME } from '../../constants/constants';

function Footer(props) {
    return (
        <footer className='float-bottom'>
            <p className='footer-text'>Industrial Development Board &copy; {new Date().getFullYear()} | Developed By {DEV_NAME}</p>
        </footer>
    )
}
export default Footer