import React, { useState } from 'react'
import './Dashboard.css'
import SLMap from '../SLMap/SLMap'

function Dashboard(props) {

    const [state] = useState({
        total_records: 480,
        total_districts: 10,
        total_provinces: 5,
        district_company: {
            'Kandy': 12,
            'Matale': 27,
            'Nuwara Eliya': 23,
            'Ampara': 54,
            'Batticaloa': 23,
            'Trincomalee': 65,
            'Anuradhapura': 43,
            'Polonnaruwa': 54,
            'Kurunegala': 17,
            'Puttalam': 75,
            'Jaffna': 54,
            'Kilinochchi': 56,
            'Mannar': 87,
            'Mullaitivu': 0,
            'Vavuniya': 0,
            'Kegalle': 34,
            'Ratnapura': 2,
            'Galle': 20,
            'Hambantota': 30,
            'Matara': 24,
            'Badulla': 43,
            'Moneragala': 43,
            'Colombo': 30,
            'Gampaha': 121,
            'Kalutara': 9
        }
    })

    return (
        <div className='dashboard-background h-100'>
            <div className='row card-row justify-content-around w-100'>
                <div className='dashboard-card'>
                    <div className='dash-card-content'>
                        <p className='card-heading'>Contains</p>
                        <p className='card-value'>{state.total_records}</p>
                        <p className='card-heading'>Company Records</p>
                    </div>
                </div>
                <div className='dashboard-card'>
                    <div className='dash-card-content'>
                        <p className='card-heading'>From</p>
                        <p className='card-value'>{state.total_districts}</p>
                        <p className='card-heading'>Districts</p>
                    </div>
                </div>
                <div className='dashboard-card'>
                    <div className='dash-card-content'>
                        <p className='card-heading'>Covering</p>
                        <p className='card-value'>{state.total_provinces === 9 ? 'All' : state.total_provinces}</p>
                        <p className='card-heading'>Provinces</p>
                    </div>
                </div>
            </div>
            <SLMap district_company={state.district_company}></SLMap>
        </div>
    )
}

export default Dashboard;