import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import axios from 'axios'
import './FurnaceCapcity.css'

function MachineryInvestment(props) {

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        disVal: {},
        hasReq: false,
        requestPending: false,
        dataEmpty: true,
    })

    const getData = () => [
        setState(prevState => ({
            ...prevState,
            requestPending: true
        })),
        axios.post('/admin/getMachineryInvestmentData')
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
                        <div className='filter-row' >
                            <p className='topic-text'>Machinery Investment</p>
                            <form className='row mt-3 justify-content-around' >
                                <div className="col-2 mt-4 ml-2 form-group" >
                                    <div className='btn btn-outline-dark' onClick={getData}>Get Data</div>
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
                                        <table className='table table-striped table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>District</th>
                                                    <th>Value</th>
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

export default MachineryInvestment;