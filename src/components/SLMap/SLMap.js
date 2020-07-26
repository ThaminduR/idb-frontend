import React, { useState } from 'react'
import './SLMap.css'

function SLMap(props) {

    const [state, setState] = useState({
        district_company: props.district_company,
        districtName: 'Colombo',
        no_company: props.district_company['Colombo'],
        ismap: true,
    })

    const districts = [{ value: 'Ampara' }, { value: 'Anuradhapura' }, { value: 'Badulla' },
    { value: 'Batticaloa' }, { value: 'Colombo' }, { value: 'Galle' },
    { value: 'Gampaha' }, { value: 'Hambantota' }, { value: 'Jaffna' },
    { value: 'Kalutara' }, { value: 'Kandy' }, { value: 'Kegalle' },
    { value: 'Kilinochchi' }, { value: 'Kurunegala' }, { value: 'Mannar' },
    { value: 'Matale' }, { value: 'Matara' }, { value: 'Moneragala' },
    { value: 'Mullaitivu' }, { value: 'Nuwara Eliya' }, { value: 'Polonnaruwa' },
    { value: 'Puttalam' }, { value: 'Ratnapura' }, { value: 'Trincomalee' },
    { value: 'Vavuniya' },


    ]

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value,
            no_company: state.district_company[value]
        }))
    }
    
    return (
        <div>
            <div className='map-div row justify-content-center'>
                <div className='col-md list-col'>
                    <div className="form-group col-md">
                        <label>District</label>
                        <select className="form-control" id='districtName' defaultValue={state.districtName} onChange={handleChange} >
                            {districts.map(function (item) {
                                return <option key={item.value} value={item.value}>{item.value}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='map-content col-md'>
                    <p className='map-value'>{'District: ' + state.districtName}</p>
                    <p className='map-value'>{'Number of Companies: ' + state.no_company}</p>
                </div>
            </div>
        </div>

    )
}

export default SLMap;
