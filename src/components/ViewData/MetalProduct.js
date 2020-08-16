import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import axios from 'axios'
import './FurnaceCapcity.css'

function MetalProduct(props) {

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        district: '',
        metal: '',
        disVal: {},
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

    const getData = () => [
        setState(prevState => ({
            ...prevState,
            requestPending: true
        })),
        axios.post('/admin/getProductData ', {
            'metla': state.metal
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        disVal: res.data.data,
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
                        <div className='filter-col' >
                            <p className='topic-text'>Metal Production</p>
                            <form className='row mt-3 justify-content-around' >
                                <div className="col-6 mt-2 form-group" >
                                    <label > Metal  </label>
                                    <select className="form-control" id='metal' defaultValue={state.metal} onChange={handleChange} >
                                        <option value=''>Select Metal</option>
                                        <option value='Stainless Steel'>Stainless Steel</option>
                                        <option value='Magnesium'>Magnesium</option>
                                        <option value='Iron'>Iron</option>
                                        <option value='Cast Iron'>Cast Iron</option>
                                        <option value='Copper'>Copper</option>
                                        <option value='Aluminum'>Aluminium</option>
                                        <option value='Brass'>Brass</option>
                                        <option value='Zinc'>Zinc</option>
                                        <option value='LMS'>LMS</option>
                                        <option value='High Carbon Steel'>High Carbon Steel</option>
                                        <option value='Manganese Steel'>Manganese Steel</option>
                                        <option value='Other'>Other</option>
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
                                        <p className='var-name'>{state.furnace ? state.furnace : "Select a Furnace to View Data"}</p>
                                        <table className='table table-striped table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>District</th>
                                                    <th>Product Capacity</th>
                                                    <th>Furnace Capacity</th>
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
                                                                    {state.disVal[item.value] ? state.disVal[item.value] : "N/A"}  {/*Compare with backend*/}
                                                                </td>
                                                                <td>
                                                                    {state.disVal[item.value] ? state.disVal[item.value] : "N/A"}  {/*Compare with backend*/}
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

export default MetalProduct;