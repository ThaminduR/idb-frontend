import React, { useState, useEffect } from 'react'
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
        disVal: { "Cupola Furnace": { "Colombo": 23 } },
        hasReq: false,
        requestPending: false,
        companies: [],
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
        console.log("ID:", id, "Value:", value)

        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
        console.log(state.furnace)

    }

    const getData = () => [
        axios.post('/admin/viewSurveys', {
            'yoi': state.yoi
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        companyData: res.data.companyData,
                        successMessage: 'Data Retireved',
                        requestPending: false
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

    //eslint-disable-next-line
    useEffect(() => {
        if (state.hasReq || !state.requestPending) {
            return
        }
        getData()

        setState(prevState => ({
            ...prevState,
            hasReq: true,
            requestPending: true
        }))

    })

    // const closeError = (e) => {
    //     e.preventDefault()
    //     setState(prevState => ({
    //         ...prevState,
    //         errorMessage: '',
    //         successMessage: ''
    //     }))
    // }

    return (
        <div className='viewdata-background' >
            <div className='container-fluid'>
                <div className='col'>
                    <div className='option-col'>
                        <div className='filter-col' >
                            <h2>Demo Only</h2>
                            <form className='row mt-3 justify-content-around' >
                                <div className="col-3 form-group" >
                                    <label > Furnace </label>
                                    <select className="form-control" id='furnace' defaultValue={state.furnace} onChange={handleChange} >
                                        <option value=''>Select Furnace</option>
                                        <option value='Cupola Furnace'>Cupola Furnace</option>
                                        <option value='Pit Furnace'>Pit Furnace</option>
                                        <option value='Induction Furnace'>Induction Furnace</option>
                                        <option value='Tilt Furnace'>Tilt Furnace</option>
                                    </select>
                                </div>
                                <div className="col-3 form-group" >
                                    <label > Select Range </label>
                                    <div className='col justify-content-start'>
                                        <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="greater" name='range' value='Greater' /><label className='form-check-label'>Greater Than or Equal</label></div>
                                        <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="less" name='range' value='Less' /><label className='form-check-label'>Less Than or Equal</label></div>
                                    </div>
                                </div>
                                <div className="col-3 form-group" >
                                    <label > Capacity </label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='filter-result-div'>
                        <div className=''>
                            {state.requestPending
                                ?
                                <div className={"alert filter-alert alert-info"} role="alert" >Loading... </div>
                                : !state.dataEmpty
                                    ?
                                    <div>
                                        <p className='no-rec-text-analyze'> No data to Show</p>
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
                                                                    {state.disVal[state.furnace] ? state.disVal[state.furnace][item.value] : "N/A"}
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