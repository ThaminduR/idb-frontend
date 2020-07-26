import React, { useState } from 'react'
import './ViewData.css'
function ViewData(props) {

    document.title = 'View Data'

    const [state, setState] = useState({
        province: '',
        district: '',

    })

    const districts = {
        '': [{ value: '' }],
        'Central': [{ value: 'Select District' }, { value: 'Kandy' }, { value: 'Matale' }, { value: 'Nuwara Eliya' }],
        'Eastern': [{ value: 'Select District' }, { value: 'Ampara' }, { value: 'Batticaloa' }, { value: 'Trincomalee' }],
        'North Central': [{ value: 'Select District' }, { value: 'Anuradhapura' }, { value: 'Polonnaruwa' }],
        'North Western': [{ value: 'Select District' }, { value: 'Kurunegala' }, { value: 'Puttalam' }],
        'Northern': [{ value: 'Select District' }, { value: 'Jaffna' }, { value: 'Kilinochchi' }, { value: 'Mannar' }, { value: 'Mullaitivu' }, { value: 'Vavuniya' }],
        'Sabaragamuwa': [{ value: 'Select District' }, { value: 'Kegalle' }, { value: 'Ratnapura' }],
        'Southern': [{ value: 'Select District' }, { value: 'Galle' }, { value: 'Hambantota' }, { value: 'Matara' }],
        'Uva': [{ value: 'Select District' }, { value: 'Badulla' }, { value: 'Moneragala' }],
        'Western': [{ value: 'Select District' }, { value: 'Colombo' }, { value: 'Gampaha' }, { value: 'Kalutara' }]
    }

    const handleChange = (e) => {
        const [id, value] = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //This function is binded to onCLick of the test button

    const test = (e) => {
        e.preventDefault()
        console.log(state.companyName)
        console.log(state.province)
        console.log(state.district)
        console.log(state.yoi)
        console.log('End')
    }

    return (
        <div className='viewdata-background'>
            <button className='btn btn-dark' onClick={test}>Test</button>
            <div className='container'>
                <div className='row filter-row'>
                    <div className="form-group col-md">
                        <label >Province</label>
                        <select className="form-control" id='province' defaultValue={state.province} placeholder='Select Province' onChange={handleChange} >
                            {Object.keys(districts).map(key => {
                                return <option key={key} value={key}>{key}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md">
                        <label>District</label>
                        <select className="form-control" id='district' defaultValue={state.district} onChange={handleChange} >
                            {districts[state.province].map(function (item) {
                                return <option key={item.value} value={item.value}>{item.value}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewData;