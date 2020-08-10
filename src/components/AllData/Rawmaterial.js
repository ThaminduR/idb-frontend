import React, { useState, useEffect } from 'react'
import './Rawmaterial.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function Rawmaterial(props) {

    document.title = 'Raw Material Data'

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        statechange: '',
        successMessage: null,
        errorMessage: null,
        infoMessage: false,
        //API State
        hasReq: false,
        requestPending: false,
        dataVerify: false,
        id: '',
        //Form Data
        companyName: '',
        raw_materials: [],
    })

    const getRecordData = () => {
        axios.post('/admin/viewRawMat', {
            'id': state.id
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        requestPending: false,
                        raw_materials: res.data.raw_materials,
                    }))
                    console.log(state.annual_turnover)
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
    }

    // eslint-disable-next-line
    useEffect(() => {

        if (state.dataVerify) return

        const { data } = props.location

        if (data) {
            setState(prevState => ({
                ...prevState,
                companyName: data,
                dataVerify: true,
                requestPending: true
            }))
        } else {
            history.push('/AllRecords')
        }
    })

    // eslint-disable-next-line
    useEffect(() => {
        if (state.hasReq || !state.requestPending || !state.dataVerify) {
            return
        }
        getRecordData()

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
        <div className='rawmat-background'>
            <div className='container'>
                <div className={"alert form-alert alert-danger" + ((state.errorMessage) ? ' errorMessage1' : ' errorMessage2')} role="alert">
                    {state.errorMessage}
                    <button type="button" className="close ml-1" aria-label="Close" id='errorMessage' onClick={(e) => closeError(e)} ><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
                <div className={"alert form-alert alert-success" + ((state.successMessage) ? ' errorMessage1' : ' errorMessage2')} role="alert">
                    {state.successMessage}
                    <button type="button" className="close ml-1" aria-label="Close" id='successMessage' onClick={(e) => closeError(e)} ><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
                {
                    state.requestPending
                        ?
                        <div className={"alert viewsur-alert alert-info"} role="alert">
                            Loading ...
                        </div>
                        :
                        <div>
                            <div className='container form-card form-view'>
                                
                                <div className="form-group">
                                    <label className='topic-text'>Name</label>
                                    <p>{state.companyName}</p>
                                </div>
                                <table className='table mt-4 table-bordered'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>Type of Metal</th>
                                            <th>Origin (Local/Imported) (kW)</th>
                                            <th>State (Scrap/Virgin) (kW)</th>
                                            <th>Amount (Kg)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.raw_materials.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.metal}</td>
                                                    <td>{item.origin}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.metal_usage}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                }
            </div>
        </div>
    )
}

export default Rawmaterial;