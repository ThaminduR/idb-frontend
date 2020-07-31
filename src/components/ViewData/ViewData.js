import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
// import { useAuth } from '../../services/AuthenticationService'
// import axios from 'axios'
import './ViewData.css'

function ViewData(props) {

    document.title = 'Data Analysis'

    // const history = useHistory()

    // const { setAuthTokens } = useAuth()

    // const [state, setState] = useState({
    //     province: '',
    //     district: '',
    //     param1: '',
    //     param2: '',
    //     param3: '',
    //     hasReq: false,
    //     requestPending: false,
    //     companies: [],
    //     dataEmpty: true,
    // })

    // const districts = [{ value: 'Select District' }, { value: 'Kandy' }, { value: 'Matale' }, { value: 'Nuwara Eliya' },
    // { value: 'Ampara' }, { value: 'Batticaloa' }, { value: 'Trincomalee' },
    // { value: 'Anuradhapura' }, { value: 'Polonnaruwa' },
    // { value: 'Kurunegala' }, { value: 'Puttalam' },
    // { value: 'Jaffna' }, { value: 'Kilinochchi' }, { value: 'Mannar' }, { value: 'Mullaitivu' }, { value: 'Vavuniya' },
    // { value: 'Kegalle' }, { value: 'Ratnapura' },
    // { value: 'Galle' }, { value: 'Hambantota' }, { value: 'Matara' },
    // { value: 'Badulla' }, { value: 'Moneragala' },
    // { value: 'Colombo' }, { value: 'Gampaha' }, { value: 'Kalutara' }
    // ]

    // const handleChange = (e) => {
    //     const [id, value] = e.target
    //     setState(prevState => ({
    //         ...prevState,
    //         [id]: value
    //     }))
    // }

    // const getData = () => [
    //     axios.post('/admin/viewSurveys', {
    //         'yoi': state.yoi
    //     })
    //         .then(function (res) {
    //             if (res.data.code === 200) {
    //                 setState(prevState => ({
    //                     ...prevState,
    //                     companyData: res.data.companyData,
    //                     successMessage: 'Data Retireved',
    //                     requestPending: false
    //                 }))
    //             } else if (res.data.code === 401) {
    //                 setAuthTokens(res.data)
    //                 history.replace('/error')
    //             } else {
    //                 setState(prevState => ({
    //                     ...prevState,
    //                     errorMessage: res.data.message,
    //                     requestPending: false
    //                 }))
    //             }

    //         }).catch(function (err) {
    //             setState(prevState => ({
    //                 ...prevState,
    //                 errorMessage: "Error",
    //                 requestPending: false
    //             }))
    //         })
    // ]

    // eslint-disable-next-line
    // useEffect(() => {
    //     if (state.hasReq || !state.requestPending) {
    //         return
    //     }
    //     getData()

    //     setState(prevState => ({
    //         ...prevState,
    //         hasReq: true,
    //         requestPending: true
    //     }))

    // })

    // const closeError = (e) => {
    //     e.preventDefault()
    //     setState(prevState => ({
    //         ...prevState,
    //         errorMessage: '',
    //         successMessage: ''
    //     }))
    // }

    return (<div className='viewdata-background' >
        <p>Data Analysis UI</p>
        {/* <div className='row'>
            <div className='col-sm-2'>
                <div className='col' >
                    <form className=' mt-4' >
                        <div className="form-group" >
                            <label > District </label> <select className="form-control"
                                id='district'
                                defaultValue={state.district}
                                onChange={handleChange} > {
                                    districts.map(function (item) {
                                        return <option key={item.value}
                                            value={item.value} > {item.value} </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group" >
                            <label > District </label>
                            <select className="form-control" id='district' defaultValue={state.district} onChange={handleChange} ></select>
                        </div> <div className="form-group" >
                            <label > District </label>
                        </div>
                    </form>
                </div>
            </div>
            <div className='col'>
                <div className='filter-result-div'>
                    {state.requestPending
                        ?
                        <div className={"alert filter-alert alert-info"} role="alert" >Loading... </div>
                        : !state.dataEmpty
                            ?
                            <div></div>
                            :
                            <div className="alert filter-alert alert-info" role="alert" >No data to Show </div>
                    }
                </div>
            </div>
        </div> */}
    </div>
    )
}

export default ViewData;