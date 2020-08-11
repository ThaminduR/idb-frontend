import React, { useState, useEffect } from 'react'
import './AllData.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
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
        history.push({
            pathname: '/viewRecord',
            data: id,
        })
    }

    const viewRawMat = (e, id, name) => {
        history.push({
            pathname: '/viewRawMat',
            data: [name, id],
        })
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
                                        <th>Local Employee</th>
                                        <th>Foreign Employee</th>
                                        <th>Local Market</th>
                                        <th>Foreign Market</th>
                                        <th>Raw Material Data</th>
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
                                                <td>{item.local_employee_category ? item.local_employee_category : "-"}</td>
                                                <td>{item.foreign_employee_category ? item.foreign_employee_category : "-"}</td>
                                                <td>{item.local_retails + item.local_companies}</td>
                                                <td>{item.foreigh_market ? item.foreigh_market : "-"}</td>
                                                <td><button className='close'><i className="fa fa-life-ring" onClick={(e) => viewRawMat(e, item.id, item.name)} aria-hidden="true"></i></button></td>
                                                <td><button className='close'><i className="fa fa-file-text-o" onClick={(e) => viewARecord(e, item.id)} aria-hidden="true"></i></button></td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
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