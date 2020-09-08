import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import axios from 'axios'
import './FurnaceCapcity.css'

function ExpectedProduction(props) {

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        product: '',
        loadedproduct: '',
        disVal: {},
        hasReq: false,
        requestPending: false,
        dataEmpty: true,
    })

    const handleChange = (e) => {
        const { id, value } = e.target

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
        axios.post('/admin/getAvgProductionData', {
            'product': state.product,
            'state': 'Expected'
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        disVal: res.data.data,
                        loadedproduct: state.product,
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
                    errorMessage: "Data Retrieval Error",
                    requestPending: false
                }));
                console.log(err)
            })
    ]

    return (
        <div className='viewdata-background' >
            <div className='container-fluid'>
                <div className='col'>
                    <div className='option-col'>
                        <div className='filter-row' >
                            <p className='topic-text'>Average Expected Production</p>
                            <form className='row mt-3 justify-content-around' >
                                <div className="col-6 mt-2 form-group" >
                                    <label > Product  </label>
                                    <select className="form-control" id='product' defaultValue={state.product} onChange={handleChange} >
                                        <option value=''>Select Type</option>
                                        <option value='Ornamentals'>Ornamentals</option>
                                        <option value='Machinery and Automobile (Loading)'>Machinery and Automobile (Loading)</option>
                                        <option value='Machinery and Automobile (No Loading)'>Machinery and Automobile (No Loading)</option>
                                        <option value='Machinery Tools and Parts'>Machinery Tools and Parts</option>
                                        <option value='Building Items'>Building Items</option>
                                        <option value='Precision Items'>Precision Items</option>
                                        <option value='Domestic Items'>Domestic Items</option>
                                        <option value='Semi Finish Products'>Semi Finish Products</option>
                                        <option value='Electric Cables'>Electric Cables</option>
                                        <option value='Total'>Total</option>
                                    </select>
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
                                        <p className='var-name'>{state.loadedproduct ? state.loadedproduct : "Select a Product to View Data"}</p>
                                        <table className='table table-striped table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>District</th>
                                                    <th>Expected Production (Kg/Month)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    state.disVal.map((item, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>
                                                                    {item.district}
                                                                </td>
                                                                <td>
                                                                    {item.total}
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

export default ExpectedProduction;