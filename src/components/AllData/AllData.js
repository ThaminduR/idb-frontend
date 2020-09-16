import React, { useState, useEffect } from 'react'
import './AllData.css'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function AllData(props) {

    document.title = 'All Records'

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        successMessage: null,
        errorMessage: null,
        hasReq: false,
        requestPending: true,
        companyData: [],
        products: [],
        raw_materials: [],
        yoi: 2020,
        dataEmpty: false,
    })


    const getData = () => [
        axios.post('/admin/viewSurveys', {
            'yoi': state.yoi
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        companyData: res.data.companyData,
                        products: res.data.products,
                        raw_materials: res.data.raw_materials,
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
                    errorMessage: "Data Retrieval Error",
                    requestPending: false
                }))
            })
    ]

    // eslint-disable-next-line
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

    const closeError = (e) => {
        e.preventDefault()
        setState(prevState => ({
            ...prevState,
            errorMessage: '',
            successMessage: ''
        }))
    }

    const viewARecord = (e, id) => {
        localStorage.setItem('id', id);
        // history.push({
        //     pathname: '/viewRecord',
        //     data: id,
        // })
    }

    return (
        <div className='alldata-background'>
            <div className='container-flex'>
                {state.requestPending
                    ?
                    <div className={"alert viewsur-alert alert-info"} role="alert">
                        Loading ...
                    </div>
                    :
                    <div>
                        {!state.dataEmpty
                            ?
                            <div className='table-overflow'>
                                <table className='table table-div table-bordered table-striped'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>District</th>
                                            <th>Address</th>
                                            <th>Telephone</th>
                                            <th>Turnover Category</th>
                                            <th>Business Type</th>
                                            <th>
                                                Products
                                            <tr>
                                                    <th>Metal</th>
                                                    <th>Product</th>
                                                    <th>Weights</th>
                                                </tr>
                                            </th>
                                            <th>
                                                Raw Materials
                                            <tr>
                                                    <th>Metal</th>
                                                    <th>Origin</th>
                                                    <th>State</th>
                                                    <th>Usage</th>
                                                </tr>
                                            </th>
                                            <th>Local Market</th>
                                            <th>Foreign Market</th>
                                            <th>Local Employee</th>
                                            <th>Foreign Employee</th>
                                            <th>Complete Record</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.companyData.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.district}</td>
                                                    <td>{item.address ? item.address : "-"}</td>
                                                    <td>{item.telephone ? item.telephone : "-"}</td>
                                                    <td>{item.turnover_category ? item.turnover_category : "-"}</td>
                                                    <td>{item.business_type ? item.business_type : "-"}</td>
                                                    <td>{state.products.map((p_item, p_key) => {
                                                        if (item.id === p_item.id) {
                                                            return (
                                                                <tr key={p_key}>
                                                                    <td>{p_item.metal ? p_item.metal : "-"}</td>
                                                                    <td>{p_item.product ? p_item.product : '-'}</td>
                                                                    <td>{p_item.weight ? p_item.weight : '-'}</td>
                                                                </tr>)
                                                        } else {
                                                            return null
                                                        }
                                                    })}</td>
                                                    <td>{state.raw_materials.map((r_item, r_key) => {
                                                        if (item.id === r_item.id) {
                                                            return (
                                                                <tr key={r_key}>
                                                                    <td>{r_item.metal ? r_item.metal : '-'}</td>
                                                                    <td>{r_item.origin ? r_item.origin : '-'}</td>
                                                                    <td>{r_item.state ? r_item.state : "-"}</td>
                                                                    <td>{r_item.metal_usage ? r_item.metal_usage : '-'}</td>
                                                                </tr>)
                                                        } else {
                                                            return null
                                                        }
                                                    })}</td>
                                                    <td>{item.local_retails + item.local_companies}</td>
                                                    <td>{item.foreigh_market ? item.foreigh_market : "-"}</td>
                                                    <td>{item.local_employee_category ? item.local_employee_category : "-"}</td>
                                                    <td>{item.foreign_employee_category ? item.foreign_employee_category : "-"}</td>
                                                    <td><Link
                                                        target='_blank'
                                                        to={{
                                                            pathname: "/viewRecord",
                                                        }}

                                                    ><i className="fa fa-file-text-o" aria-hidden="true" onClick={(e) => viewARecord(e, item.id)}></i></Link>
                                                    </td>
                                                    {/* <td><button className='close'><i className="fa fa-file-text-o" onClick={(e) => viewARecord(e, item.id)} aria-hidden="true"></i></button></td> */}
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className="alert viewsur-alert alert-danger" role="alert">
                                No data to Show
                            </div>

                        }
                        <div>
                            <div className={"alert viewsur-alert alert-danger" + ((state.errorMessage) ? ' errorMessage1' : ' errorMessage2')} role="alert">
                                {state.errorMessage}
                                <button type="button" className="close ml-1" aria-label="Close" id='errorMessage' onClick={(e) => closeError(e)} ><i className="fa fa-times" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default AllData;