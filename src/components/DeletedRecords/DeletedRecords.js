import React, { useState, useEffect } from 'react'
import './DeletedRecords.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function DeletedRecords(props) {

    document.title = 'Deleted Records'

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        successMessage: null,
        errorMessage: null,
        hasReq: false,
        requestPending: true,
        deletedData: [],
        yoi: 2020,
        isDataEmpty: true,
    })


    const getData = () => [
        axios.get('/admin/deletedSurveys')
            .then(function (res) {
                if (res.data.code === 200) {
                    if (res.data.deletedcompany.length) {
                        setState(prevState => ({
                            ...prevState,
                            deletedData: res.data.deletedcompany,
                            isDataEmpty: false
                        }))
                    }
                    setState(prevState => ({
                        ...prevState,
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

    return (
        <div className='delete-background'>
            <div className='container-flex delete-div'>
                {state.requestPending
                    ?
                    <div className={"alert viewsur-alert alert-info"} role="alert">
                        Loading ...
                    </div>
                    :
                    <div>
                        {!state.isDataEmpty
                            ?
                            <div>
                                <table className='table table-div table-bordered table-striped'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>Name</th>
                                            <th>District</th>
                                            <th>Address</th>
                                            <th>Telephone</th>
                                            <th>Surveyed Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.deletedData.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.name}</td>
                                                    <td>{item.district}</td>
                                                    <td>{item.address ? item.address : "N/A"}</td>
                                                    <td>{item.telephone ? item.telephone : "N/A"}</td>
                                                    <td>{item.surveyed_year}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                                <div>
                                    <div className={"alert viewsur-alert alert-danger" + ((state.errorMessage) ? ' errorMessage1' : ' errorMessage2')} role="alert">
                                        {state.errorMessage}
                                        <button type="button" className="close ml-1" aria-label="Close" id='errorMessage' onClick={(e) => closeError(e)} ><i className="fa fa-times" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <p className='no-rec-text'> No data to Show</p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default DeletedRecords;