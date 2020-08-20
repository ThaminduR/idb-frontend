import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import axios from 'axios'
import './FurnaceCapcity.css'

function MetalProduct(props) {

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        type: '',
        metal: '',
        loadedmetal:'',
        disValFur: [],
        disValProd: [],
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
        axios.post('/admin/getProductionData ', {
            'metal': state.metal
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        disValProd: res.data.products,
                        disValFur: res.data.furnaces,
                        loadedmetal:state.metal,
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
                            <p className='topic-text'>Production Data</p>
                            <form className='row mt-3 justify-content-around' >
                                <div className="col-4 mt-2 form-group" >
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
                                <div className="col-2 mt-2 ml-2 form-group" >
                                    <label > Product/ Furnace  </label>
                                    <select className="form-control" id='type' defaultValue={state.type} onChange={handleChange} >
                                        <option value=''>Select Type</option>
                                        <option value='Product'>Product</option>
                                        <option value='Furnace'>Furnace</option>
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
                                        <p className='var-name'>{state.loadedmetal ? state.loadedmetal + " - " + state.type : "Select a Metal to View Data"}</p>
                                        <table className='table table-striped table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>District</th>
                                                    <th>Capacity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(state.type === 'Product') ?
                                                    state.disValProd.map((item, key) => {
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
                                                    : (state.type === 'Furnace') ?
                                                    state.disValFur.map((item, key) => {
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
                                                    :
                                                    ""
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