import React from 'react'
import './Home.css'
import Footer from '../Footer/Footer';
import NavigationBar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
function Home(props) {

    return (
        <div className='background'>
            {/* <NavigationBar></NavigationBar> */}
            <Sidebar></Sidebar>
            <div className='container'></div>
        </div>
    )
}

export default Home;