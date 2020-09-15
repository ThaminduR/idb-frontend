import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'
import axios from 'axios'
import './DataAnalysis.css'


function DataAnalysis(props) {

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        district: '',
        scale: '',
        market: '',
        //Metal
        metal: '',
        metalrange: '',
        metalcapacity: '',
        //Furnace
        furnace: '',
        furnacerange: '',
        furnacecapacity: '',
        //Product
        product: '',
        productrange: '',
        productcapacity: '',
        companyNames: [],
        hasReq: false,
        requestPending: false,
        dataEmpty: true,
    })


    const districts = [{ value: '*' }, { value: 'Ampara' }, { value: 'Anuradhapura' }, { value: 'Badulla' },
    { value: 'Batticaloa' }, { value: 'Colombo' }, { value: 'Galle' },
    { value: 'Gampaha' }, { value: 'Hambantota' }, { value: 'Jaffna' },
    { value: 'Kalutara' }, { value: 'Kandy' }, { value: 'Kegalle' },
    { value: 'Kilinochchi' }, { value: 'Kurunegala' }, { value: 'Mannar' },
    { value: 'Matale' }, { value: 'Matara' }, { value: 'Moneragala' },
    { value: 'Mullaitivu' }, { value: 'Nuwara Eliya' }, { value: 'Polonnaruwa' },
    { value: 'Puttalam' }, { value: 'Ratnapura' }, { value: 'Trincomalee' },
    { value: 'Vavuniya' }]

    const handleChange = (e) => {
        const { id, value } = e.target

        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleCheckChange = (e, id) => {
        const { value } = e.target

        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const getData = () => [
        console.log("Sent"),
        setState(prevState => ({
            ...prevState,
            requestPending: true
        })),
        axios.post('/admin/getFilteredData ', {
            'district': state.district,
            'scale': state.scale,
            'market': state.market,
            //Metal
            'metal': state.metal,
            'metalrange': state.metalrange,
            'metalcapacity': state.metalcapacity,
            //Furnace
            'furnace': state.furnace,
            'furnacerange': state.furnacerange,
            'furnacecapacity': state.furnacecapacity,
            //Product
            'product': state.product,
            'productrange': state.productrange,
            'productcapacity': state.productcapacity
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        companyNames: res.data.data,
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

    const viewARecord = (e, id) => {
        history.push({
            pathname: '/viewRecord',
            data: id,
        })
    }

    return (
        <div className='dataanalysis-background' >
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col justify-content-center'>
                        <div className='filter-col '>
                            <form className='col-10 mt-3 ml-2 justify-content-around' >
                                <hr className='filter-break' />
                                <div className="row mt-2  form-group" >
                                    <label > District </label>
                                    <select className="form-control" id='district' defaultValue={state.district} onChange={handleChange} >
                                        {districts.map(function (item) {
                                            return <option key={item.value} value={item.value}>{(item.value === "*") ? "Select District" : item.value}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="row mt-2 form-group" >
                                    <label > Scale </label>
                                    <select className="form-control" id='scale' defaultValue={state.scale} onChange={handleChange} >
                                        <option value=''>Select Scale</option>
                                        <option value='Macro'>Macro</option>
                                        <option value='Small'>Small</option>
                                        <option value='Medium'>Medium</option>
                                        <option value='Large'>Large</option>
                                    </select>
                                </div>
                                <div className="row mt-2 form-group" >
                                    <label > Market </label>
                                    <select className="form-control" id='market' defaultValue={state.market} onChange={handleChange} >
                                        <option value=''>Select Market</option>
                                        <option value='Local'>Local</option>
                                        <option value='Export'>Export</option>
                                        <option value='Both'>Both</option>
                                    </select>
                                </div>
                                <hr className='filter-break' />
                                <h6>Metal Type</h6>
                                <div className="row mt-2 form-group" >
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
                                <div className='row'>
                                    <div className="col mt-2 form-group" >
                                        <label > Select Range </label>
                                        <div className='row mt-2 justify-content-around' onChange={(e) => handleCheckChange(e, 'metalrange')}>
                                            <div className="form-check form-check-inline range-div"><input className="form-check-input" type="radio" id="greater" name='metalrange' value='Greater' /><label className='form-check-label'>Greater</label></div>
                                            <div className="form-check form-check-inline range-div "><input className="form-check-input" type="radio" id="less" name='metalrange' value='Less' /><label className='form-check-label'>Less</label></div>
                                            <div className="form-check form-check-inline range-div "><input className="form-check-input" type="radio" id="none" name='metalrange' value='' /><label className='form-check-label'>None</label></div>
                                        </div>
                                    </div>
                                    <div className="col mt-2 form-group" >
                                        <label > Capacity (kg /month) </label>
                                        <input type="text" className="form-control" id='metalcapacity' disabled={state.metalrange === ''} value={state.metalcapacity} onChange={handleChange} placeholder='Numeric Value' />
                                    </div>
                                </div>
                                <hr className='filter-break' />
                                <h6>Furnace</h6>
                                <div className="row mt-2 form-group" >
                                    <label > Furnace </label>
                                    <select className="form-control" id='furnace' defaultValue={state.furnace} onChange={handleChange} >
                                        <option value=''>Select Furnace</option>
                                        <option value='Cupola Furnace'>Cupola Furnace</option>
                                        <option value='Pit Furnace'>Pit Furnace</option>
                                        <option value='Induction Furnace'>Induction Furnace</option>
                                        <option value='Tilt Furnace'>Tilt Furnace</option>
                                    </select>
                                </div>
                                <div className='row'>
                                    <div className="col mt-2 form-group" >
                                        <label > Select Range </label>
                                        <div className='row mt-2 justify-content-around' onChange={(e) => handleCheckChange(e, 'furnacerange')}>
                                            <div className="form-check form-check-inline range-div"><input className="form-check-input" type="radio" id="greater" name='furnacerange' value='Greater' /><label className='form-check-label'>Greater</label></div>
                                            <div className="form-check form-check-inline range-div "><input className="form-check-input" type="radio" id="less" name='furnacerange' value='Less' /><label className='form-check-label'>Less</label></div>
                                            <div className="form-check form-check-inline range-div "><input className="form-check-input" type="radio" id="none" name='furnacerange' value='' /><label className='form-check-label'>None</label></div>
                                        </div>
                                    </div>
                                    <div className="col mt-2 form-group" >
                                        <label > Capacity (kg/ batch)</label>
                                        <input type="text" className="form-control" id='furnacecapacity' disabled={state.furnacerange === ''} value={state.furnacecapacity} onChange={handleChange} placeholder='Numeric Value' />
                                    </div>
                                </div>
                                <hr className='filter-break' />
                                <h6>Product</h6>
                                <div className="row mt-2 form-group" >
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
                                    </select>
                                </div>
                                <div className='row'>
                                    <div className="col mt-2 form-group" >
                                        <label > Select Range </label>
                                        <div className='row mt-2 justify-content-around' onChange={(e) => handleCheckChange(e, 'productrange')}>
                                            <div className="form-check form-check-inline range-div"><input className="form-check-input" type="radio" id="greater" name='productrange' value='Greater' /><label className='form-check-label'>Greater</label></div>
                                            <div className="form-check form-check-inline range-div "><input className="form-check-input" type="radio" id="less" name='productrange' value='Less' /><label className='form-check-label'>Less</label></div>
                                            <div className="form-check form-check-inline range-div "><input className="form-check-input" type="radio" id="none" name='productrange' value='' /><label className='form-check-label'>None</label></div>
                                        </div>
                                    </div>
                                    <div className="col mt-2 form-group" >
                                        <label > Capacity (quantity/ month) </label>
                                        <input type="text" className="form-control" id='productcapacity' disabled={state.productrange === ''} value={state.productcapacity} onChange={handleChange} placeholder='Numeric Value' />
                                    </div>
                                </div>
                                <hr className='filter-break' />
                                <div className="row mt-4 ml-2 form-group" >
                                    <div className='btn btn-outline-dark' onClick={getData}>Search</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='companyname-div'>
                            {state.requestPending
                                ?
                                <div className='loading-text' role="alert" >Loading... </div>
                                : state.dataEmpty
                                    ?
                                    <div>
                                    </div>
                                    :
                                    <div className='data-view-div'>
                                        {(state.companyNames.length === 0)
                                            ? <div></div>
                                            : <div className='count-text' role="alert" >{state.companyNames.length + ' Companies Found'}</div>}
                                        {
                                            (state.companyNames.length === 0)
                                                ? <div className='loading-text' role="alert" >No Companies Found</div>
                                                : <table className='table table-bordered table-striped'>
                                                    <thead className='thead-light'>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>VIew Data</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            state.companyNames.map((item, key) => {
                                                                return (
                                                                    <tr key={key}>
                                                                        <td>{item.name}</td>
                                                                        <td><button className='close'><i className="fa fa-file-text-o" onClick={(e) => viewARecord(e, item.id)} aria-hidden="true"></i></button></td>
                                                                    </tr>)
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DataAnalysis;