import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import axios from 'axios'
import './ViewData.css'

function ViewData(props) {

    document.title = 'Data Analysis'

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        district: '',
        furnace: '',
        capacity: 0,
        range: '',
        disVal: { "Colombo": [{}, {}], "Galle": [] },
        hasReq: false,
        requestPending: false,
        dataEmpty: true,
    })

    const districts = [{ value: 'Kandy' }, { value: 'Matale' }, { value: 'Nuwara Eliya' },
    { value: 'Ampara' }, { value: 'Batticaloa' }, { value: 'Trincomalee' },
    { value: 'Anuradhapura' }, { value: 'Polonnaruwa' },
    { value: 'Kurunegala' }, { value: 'Puttalam' },
    { value: 'Jaffna' }, { value: 'Kilinochchi' }, { value: 'Mannar' }, { value: 'Mullaitivu' }, { value: 'Vavuniya' },
    { value: 'Kegalle' }, { value: 'Ratnapura' },
    { value: 'Galle' }, { value: 'Hambantota' }, { value: 'Matara' },
    { value: 'Badulla' }, { value: 'Moneragala' },
    { value: 'Colombo' }, { value: 'Gampaha' }, { value: 'Kalutara' }
    ]

    const handleChange = (e) => {
        const { id, value } = e.target

        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleCheckChange = (e, id) => {
        const { value } = e.target

        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const getData = () => [
        setState(prevState => ({
            ...prevState,
            requestPending: true
        })),
        axios.post('/admin/getFurnanceData ', {
            'furnace': state.furnace,
            'capacity': state.capacity,
            'range': state.range
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        disVal: res.data.companydistrictlist,
                        successMessage: 'Data Retireved',
                        requestPending: false,
                        hasReq: true,
                        dataEmpty: false
                    }))
                } else if (res.data.code === 401) {
                    setAuthTokens(res.data)
                    history.replace('/error')
                } else {
                    setState(prevState => ({
                        ...prevState,
                        errorMessage: res.data.message,
                        requestPending: false
                    }))
                }

            }).catch(function (err) {
                setState(prevState => ({
                    ...prevState,
                    errorMessage: "Error",
                    requestPending: false
                }))
            })
    ]

    return (
        <div className='viewdata-background' >
            <div className='container-fluid'>
                <div className='col'>
                    <div className='option-col'>
                        <div className='filter-col' >
                            <form className='row mt-3 justify-content-around' >
                                <div className="col-2 mt-2 form-group" >
                                    <label > Furnace </label>
                                    <select className="form-control" id='furnace' defaultValue={state.furnace} onChange={handleChange} >
                                        <option value=''>Select Furnace</option>
                                        <option value='Cupola Furnace'>Cupola Furnace</option>
                                        <option value='Pit Furnace'>Pit Furnace</option>
                                        <option value='Induction Furnace'>Induction Furnace</option>
                                        <option value='Tilt Furnace'>Tilt Furnace</option>
                                    </select>
                                </div>
                                <div className="col-2 mt-2 form-group" >
                                    <label > Select Range </label>
                                    <div className='row mt-2 justify-content-center' onChange={(e) => handleCheckChange(e, 'range')}>
                                        <div className="form-check form-check-inline range-div"><input className="form-check-input" type="radio" id="greater" name='range' value='Greater' /><label className='form-check-label'>Greater Than</label></div>
                                        <div className="form-check form-check-inline range-div "><input className="form-check-input" type="radio" id="less" name='range' value='Less' /><label className='form-check-label'>Less Than</label></div>
                                    </div>
                                </div>
                                <div className="col-2 mt-2 form-group" >
                                    <label > Capacity </label>
                                    <input type="text" className="form-control" id='capacity' value={state.capacity} onChange={handleChange} placeholder='Numeric Value' />
                                </div>
                                <div className="col-2 mt-4 ml-2 form-group" >
                                    <div className='btn btn-outline-dark' onClick={getData}>Search</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='filter-result-div'>
                        <div className=''>
                            {state.requestPending
                                ?
                                <div className={"alert filter-alert alert-info"} role="alert" >Loading... </div>
                                : state.dataEmpty
                                    ?
                                    <div>
                                    </div>
                                    :
                                    <div>
                                        <p className='furnace-name'>{state.furnace ? state.furnace : "Select a Furnace to View Data"}</p>
                                        <table className='table table-striped table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>District</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    districts.map((item, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>
                                                                    {item.value}
                                                                </td>
                                                                <td>
                                                                    {state.disVal[item.value] ? state.disVal[item.value].length : "N/A"}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewData;