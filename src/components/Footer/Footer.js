import React from 'react'
import './Footer.css';
import { DEV_NAME } from '../../constants/constants';

function Footer(props) {
    return (
        <footer className='float-bottom'>
            <p className='footer-text'>Industrial Development Board &copy; {new Date().getFullYear()}</p>
        </footer>
    )
}
export default Footer