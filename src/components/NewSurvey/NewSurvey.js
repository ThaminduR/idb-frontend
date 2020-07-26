import React, { useState } from 'react'
import './NewSurvey.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function NewSurvey(props) {

    document.title = 'Add New Data'

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        //t infront of variable names indicate temporary varaibles
        statechange: '',
        successMessage: null,
        errorMessage: null,
        errors: {
            name: false,
            province: false,
            district: false,
            yoi: false
        },
        companyName: '',
        province: '',
        district: '',
        dsDivision: '',
        gnDivision: '',
        latitude: '',
        longitude: '',
        address: '',
        telenumber: '',
        email: '',
        fax: '',
        website: '',
        proprietor: [], tpropr: { name: '', designation: '', tele: '', mobile: '', email: '' },
        turnover: '',
        employees: '', //macro / small / medium
        yoe: '', //year of establishment
        business_type: '', reg_no: '', //busines type - sole proprietor /... 
        industry_reg: false, industry_reg_no: '', //industry_reg - whether company is register with the ministry
        land_area: '', land_value: '',
        building_area: '', building_value: '',
        machine_value: '', utilities_value: '', total_capital_investment: '',
        raw_mat_value: '', semi_goods_value: '', goods_value: '', total_working_capital: '',
        //---- neglect this ----  owned_site: false, rented_site: false,  
        site_type: '', //owned or rented
        furnace_capacity: [], tfurnance_capacity: { metal: '', melting: '', heating: '' },
        furnances: [], tfurnance: { name: '', fuel: '' },
        machinery: [], tmachinery: { type: '', capacity: '', value: '' },
        metal_processing: [], tmetal_processing: { metal: '', melting: '', heating: '', temp: '' },
        raw_materials: [], raw_material: { metal: '', origin: '', state: '', amount: '' },
        emp_details: [], temp_details: { type: '', local: '', foreign: '' },
        products: [], product: { name: '', state: '', units: '', weight: '' },
        markets: { local_retail: '', local_companies: '', export: '' },
        other_markets: { name: '', percentage: '' },
        annual_turnover: { y2016_2017: '', y2017_2018: '', y2018_2019: '' },
        business_progression: { year1_dir: null, year1: '', year2_dir: null, year2: '' },
        waste_generated: [], waste: { type: '', amount: '', disposal: '' },
        interviewer: '',
        yoi: ''

    })

    const districts = {
        '': [{ value: '' }],
        'Central': [{ value: 'Select District' }, { value: 'Kandy' }, { value: 'Matale' }, { value: 'Nuwara Eliya' }],
        'Eastern': [{ value: 'Select District' }, { value: 'Ampara' }, { value: 'Batticaloa' }, { value: 'Trincomalee' }],
        'North Central': [{ value: 'Select District' }, { value: 'Anuradhapura' }, { value: 'Polonnaruwa' }],
        'North Western': [{ value: 'Select District' }, { value: 'Kurunegala' }, { value: 'Puttalam' }],
        'Northern': [{ value: 'Select District' }, { value: 'Jaffna' }, { value: 'Kilinochchi' }, { value: 'Mannar' }, { value: 'Mullaitivu' }, { value: 'Vavuniya' }],
        'Sabaragamuwa': [{ value: 'Select District' }, { value: 'Kegalle' }, { value: 'Ratnapura' }],
        'Southern': [{ value: 'Select District' }, { value: 'Galle' }, { value: 'Hambantota' }, { value: 'Matara' }],
        'Uva': [{ value: 'Select District' }, { value: 'Badulla' }, { value: 'Moneragala' }],
        'Western': [{ value: 'Select District' }, { value: 'Colombo' }, { value: 'Gampaha' }, { value: 'Kalutara' }]
    }

    const handleProvinceChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value,
            district: 'Select District'
        }))
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleRowChange = (e, t_arr) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [t_arr]: {
                ...prevState[t_arr],
                [id]: value
            }
        }))
    }

    const handleRowSubmit = (e, t_arr, arr) => {
        e.preventDefault()
        const newarr = { ...t_arr }
        arr.push(newarr)

        setState(prevState => ({
            ...prevState,
            stateChange: '',
        }))

        for (var key in t_arr) {
            t_arr[key] = ''
        }

    }

    const handleRowDelete = (e, key, arr) => {
        e.preventDefault()
        arr.splice(key, 1)

        setState(prevState => ({
            ...prevState,
            statechange: ''
        }))
    }

    const handleRadioChange = (e, id) => {
        const { value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleRowRadioChange = (e, t_arr, id) => {
        const { value } = e.target
        setState(prevState => ({
            ...prevState,
            [t_arr]: {
                ...prevState[t_arr],
                [id]: value
            }
        }))
    }



    const handleCheckboxChange = (e) => {
        const { id } = e.target
        const value = state[id]
        setState(prevState => ({
            ...prevState,
            [id]: !value
        }))
    }

    //This function is binded to onCLick of the test button

    // const test = (e) => {
    //     e.preventDefault()
    //     console.log(state.companyName)
    //     console.log(state.province)
    //     console.log(state.district)
    //     console.log(state.yoi)
    //     console.log('End')
    // }

    const closeError = (e) => {
        e.preventDefault()
        setState(prevState => ({
            ...prevState,
            errorMessage: '',
        }))
    }

    const validate = () => {
        return {
            name: state.companyName.length === 0,
            province: state.province.length === 0,
            district: ((state.district.length === 0) || (state.district === 'Select District')),
            yoi: state.yoi.length !== 4
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        state.errors = validate();
        const isValid = !Object.keys(state.errors).some(x => state.errors[x]);
        if (isValid) {
            const payload = {
                'companyName': state.companyName, //string
                'province': state.province, //string
                'district': state.district, //string
                'dsDivision': state.dsDivision, //string
                'gnDivision': state.gnDivision, //string
                'latitude': state.latitude, //string
                'longitude': state.longitude, //string
                'address': state.address, //string
                'telenumber': state.telenumber, //string
                'email': state.email, //string
                'fax': state.fax, //string
                'website': state.website, //string
                'proprietor': state.proprietor, //array 
                'turnover': state.turnover, //macro / small / medium
                'employees': state.employees, //macro / small / medium
                'yoe': state.yoe, //string
                'business_type': state.business_type, 'reg_no': state.reg_no,
                'industry_reg': state.industry_reg, 'industry_reg_no': state.industry_reg_no,
                'land_area': state.land_area, 'land_value': state.land_value,
                'building_area': state.building_area, 'building_value': state.building_value,
                'machine_value': state.machine_value, 'utilities_value': state.utilities_value, 'total_capital_investment': state.total_capital_investment,
                'raw_mat_value': state.raw_mat_value, 'semi_goods_value': state.semi_goods_value, 'goods_value': state.goods_value, 'total_working_capital': state.total_working_capital,
                'site_type': state.site_type, //owned or rented
                'furnace_capacity': state.furnace_capacity, //array
                'furnaces': state.furnances, //array
                'machinery': state.machinery, //array
                'metal_processing': state.metal_processing, //array
                'raw_materials': state.raw_materials, //array
                'emp_details': state.emp_details, //array
                'products': state.products, //array
                'markets': state.markets, //dictionary
                'other_markets': state.other_markets, //dictionary
                'annual_turnover': state.annual_turnover, //dictionary
                'business_progression': state.business_progression, //dictionary
                'waste_generated': state.waste_generated, //array
                'interviewer': state.interviewer, //string
                'yoi': state.yoi //string
            }
            axios.post('/admin/addSurvey', payload)
                .then(function (response) {
                    if (response.data.code === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Submit successful.',
                            'errorMessage': ''
                        }))
                        window.location.reload()
                    } else if (response.data.code === 401) {
                        setAuthTokens(response.data)
                        history.replace('/error')
                    }
                    else {
                        setState(prevState => ({
                            ...prevState,
                            'errorMessage': response.data.message,
                            'successMessage': ''
                        }))
                    }
                })
                .catch(function (error) {
                    setState(prevState => ({
                        ...prevState,
                        'errorMessage': error,
                        'successMessage': ''
                    }))
                    console.log(error);
                });
        }
        else {
            setState(prevState => ({
                ...prevState,
                'errorMessage': 'Please enter a valid Company Name, Province, District and Interviewed Year',
                'successMessage': ''
            }))
        }
    }

    return (
        <div className='newsurvey-background'>
            <div className={"alert newsur-alert alert-danger" + (state.errorMessage ? ' errorMessage1' : ' errorMessage2')} role="alert">
                {state.errorMessage}
                <button type="button" className="close ml-1" aria-label="Close" onClick={(e) => closeError(e)} ><span aria-hidden="true">&times;</span></button>
            </div>
            {/* <button className='test' onClick={test}>Test</button> */}
            <div className='container form-card'>
                <form>
                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>A. Basic Industry Data</label></div>
                    <hr className='page-break' />
                    <div className="form-group">
                        <label className='topic-text'>1. Name of the Company/Industry</label>
                        <input type="text" className={"form-control" + (state.errors.name ? " error" : "")} id="companyName" value={state.companyName} onChange={handleChange} />
                    </div>
                    <label className='topic-text'>2. Location</label>
                    <div className="form-row">
                        <div className="form-group col-md">
                            <label >Province</label>
                            <select className={"form-control" + (state.errors.province ? " error" : "")} id='province' defaultValue={state.province} placeholder='Select Province' onChange={handleProvinceChange} >
                                {Object.keys(districts).map(key => {
                                    return <option key={key} value={key}>{key}</option>
                                })}
                            </select>
                            {/* <input type="text" className="form-control" id="province" value={state.province} onChange={handleChange} /> */}
                        </div>
                        <div className="form-group col-md">
                            <label>District</label>
                            <select className={"form-control" + (state.errors.district ? " error" : "")} id='district' defaultValue={state.district} onChange={handleChange} >
                                {districts[state.province].map(function (item) {
                                    return <option key={item.value} value={item.value}>{item.value}</option>
                                })}
                            </select>
                            {/* <input type="text" className="form-control" id="district" value={state.district} onChange={handleChange} /> */}
                        </div>
                        <div className="form-group col-md">
                            <label >DS Division</label>
                            <input type="text" className="form-control" id='dsDivision' value={state.dsDivision} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md">
                            <label>GN Division</label>
                            <input type="text" className="form-control" id='gnDivision' value={state.gnDivision} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md">
                            <label>Latitude</label>
                            <input type="text" className="form-control" id='latitude' value={state.latitude} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md">
                            <label >Longitude</label>
                            <input type="text" className="form-control" id='longitude' value={state.longitude} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='topic-text'>3. Address</label>
                        <input type="text" className="form-control" id="address" value={state.address} onChange={handleChange} />
                    </div>

                    <label className='topic-text'>4. Contact Details</label>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label >Tele</label>
                            <input type="text" className="form-control" id="telenumber" value={state.telenumber} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label >Email</label>
                            <input type="text" className="form-control" id="email" value={state.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Fax</label>
                            <input type="text" className="form-control" id="fax" value={state.fax} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label >Website</label>
                            <input type="text" className="form-control" id="website" value={state.website} onChange={handleChange} />
                        </div>
                    </div>

                    <label className='topic-text'>5. Proprietor & Contact Person</label>

                    <table className="table table-bordered">
                        <thead className='thead-light'>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Tele</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Email</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.proprietor.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.tele}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td>

                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.proprietor)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="name" value={state.tpropr.name} onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><input type="text" className="form-control" id="designation" value={state.tpropr.designation} onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><input type="text" className="form-control" id="tele" value={state.tpropr.tele} onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><input type="text" className="form-control" id="mobile" value={state.tpropr.mobile} onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><input type="text" className="form-control" id="email" value={state.tpropr.email} onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tpropr, state.proprietor)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>6. What is the category that the organization belongs to?</label>

                    <div className='row radio-row'>
                        <div className='col-md mt-2 mb-2' onChange={(e) => handleRadioChange(e, 'turnover')}>
                            <label>Annual Turnover in last 1-2 years</label>
                            <table className='table table-striped table-bordered'>
                                <tbody>
                                    <tr>
                                        <td>Macro</td>
                                        <td>0-15</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="macro_turn" name='turnover' value="macro" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td>16-250</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="small_turn" name='turnover' value="small" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Medium</td>
                                        <td>251-750</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="medium_turn" name='turnover' value="medium" /></div></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className='col-md mt-2 mb-2' onChange={(e) => handleRadioChange(e, 'employees')}>
                            <label>Number of Employees</label>
                            <table className='table table-striped table-bordered'>
                                <tbody>
                                    <tr>
                                        <td>0-10</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="macro_emp" name='employees' value="macro" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>11-50</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="small_emp" name='employees' value="small" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>51-300</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="medium_emp" name='employees' value="medium" /></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className='topic-text'>7. Year of Establishment</label>
                        <input type="text" className="form-control" id="yoe" value={state.yoe} onChange={handleChange} />
                    </div>

                    <label className='topic-text'>8. Ownership and Registration of the Business</label>
                    <br />
                    <label className='mt-2 mb-2'>Type of Business Registration</label>
                    <div onChange={(e) => handleRadioChange(e, 'business_type')}>
                        <table className="table table-striped table-bordered">
                            <tbody>

                                <tr>
                                    <td>Sole Proprietor</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="sole_business" name='business_type' value="sole" /></div></td>
                                </tr>
                                <tr>
                                    <td>Partnership</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="part_business" name='business_type' value="partnership" /></div></td>
                                </tr>
                                <tr>
                                    <td>Limited Liability</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="limited_business" name='business_type' value="limited" /></div></td>

                                </tr>
                                <tr>
                                    <td>Cooperative</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="coop_business" name='business_type' value="cooperative" /></div></td>
                                </tr>
                                <tr>
                                    <td>Registration No.</td>
                                    <td><input type="text" className="form-control" id="reg_no" value={state.reg_no} onChange={handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <label className='mt-2 mb-2'>Industry Registration</label>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>

                                <td>Whether obatain Registration <br />under Ministry of Industries</td>
                                <td><div className="form-check form-check-inline"><input className="form-check-input" type="checkbox" checked={state.industry_reg} id="industry_reg" onChange={handleCheckboxChange} /></div></td>
                            </tr>
                            <tr>
                                <td>Registration No.</td>
                                <td><input type="text" className="form-control" id="industry_reg_no" value={state.industry_reg_no} onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>9. Total Investment of the Business</label>
                    <br />
                    <label>9.1 Capital Investment of the Business</label>
                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Category</th>
                                <th>Area</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Land</td>
                                <td><div className="form-group"><input type="text" className="form-control" id="land_area" value={state.land_area} onChange={handleChange} /></div></td>
                                <td><div className="form-group col"><input type="text" className="form-control" id="land_value" value={state.land_value} onChange={handleChange} /></div></td>
                            </tr>
                            <tr>
                                <td>Building</td>
                                <td><div className="form-group"><input type="text" className="form-control" id="building_area" value={state.building_area} onChange={handleChange} /></div></td>
                                <td><div className="form-group col"><input type="text" className="form-control" id="building_value" value={state.building_value} onChange={handleChange} /></div></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='table table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Category</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Plant & Machinery</td>
                                <td><input type="text" className="form-control" id="machine_value" value={state.machine_value} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Utilities</td>
                                <td><input type="text" className="form-control" id="utilities_value" value={state.utilities_value} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td><input type="text" className="form-control" id="total_capital_investment" value={state.total_capital_investment} onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label>9.2 Working Capital</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Category</th>
                                <th>Present Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Raw Material</td>
                                <td><input type="text" className="form-control" id="raw_mat_value" value={state.raw_mat_value} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Semi Finished Goods</td>
                                <td><input type="text" className="form-control" id="semi_goods_value" value={state.semi_goods_value} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Finished Goods</td>
                                <td><input type="text" className="form-control" id="goods_value" value={state.goods_value} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td ><p className='bold'>Total</p></td>
                                <td><input type="text" className="form-control" id="total_working_capital" value={state.total_working_capital} onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label>9.3 Ownership of the Business</label>
                    <div onChange={(e) => handleRadioChange(e, 'site_type')}>
                        <table className='table mt-4 table-bordered'>
                            <thead className='thead-light'>
                                <tr>
                                    <th>Factory Premises</th>
                                    <th>Present Site</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Owned by Industrialist</td>
                                    {/* <td><div className="form-check form-check-inline"><input className="form-check-input" type="checkbox" checked={state.owned_site} id="owned_site" onChange={handleCheckboxChange} /></div></td> */}
                                    <td><div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="owned_site" name='site_type' value='owned' /></div></td>
                                </tr>
                                <tr>
                                    <td>Rented/ Leased Premises</td>
                                    {/* <td><div className="form-check form-check-inline"><input className="form-check-input" type="checkbox" checked={state.rented_site} id="rented_site" onChange={handleCheckboxChange} /></div></td> */}
                                    <td><div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="rented_site" name='site_type' value='rented' /></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>B. Operational and Technical Details of Business</label></div>
                    <hr className='page-break' />

                    <label className='topic-text'>1. What Metals Does the Industry Use and What is the Total Capacity (Kg) of the Furnance?</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Metal</th>
                                <th>Melting</th>
                                <th>Heating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.furnace_capacity.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.metal}</td>
                                        <td>{item.melting}</td>
                                        <td>{item.heating}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.furnace_capacity)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='metal' defaultValue={state.tfurnance_capacity.metal} onChange={(e) => handleRowChange(e, 'tfurnance_capacity')} >
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
                                </select></td>
                                {/* <td><input type="text" className="form-control" id="metal" value={state.tfurnance_capacity.metal} onChange={(e) => handleRowChange(e, 'tfurnance_capacity')} /></td> */}
                                <td><input type="text" className="form-control" id="melting" value={state.tfurnance_capacity.melting} onChange={(e) => handleRowChange(e, 'tfurnance_capacity')} /></td>
                                <td><input type="text" className="form-control" id="heating" value={state.tfurnance_capacity.heating} onChange={(e) => handleRowChange(e, 'tfurnance_capacity')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tfurnance_capacity, state.furnace_capacity)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>2. Type of Furnances and Fuel Being Used</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Furnance</th>
                                <th>Fuel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.furnances.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.fuel}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.furnances)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='name' defaultValue={state.tfurnance.name} onChange={(e) => handleRowChange(e, 'tfurnance')} >
                                    <option value=''>Select Furnance</option>
                                    <option value='Cupola Furnance'>Cupola Furnance</option>
                                    <option value='Pit Furnance'>Pit Furnance</option>
                                    <option value='Induction Furnance'>Induction Furnance</option>
                                    <option value='Tilt Furnance'>Tilt Furnance</option>
                                    <option value='Other'>Other</option>
                                </select></td>
                                <td><select className="form-control" id='fuel' defaultValue={state.tfurnance.fuel} onChange={(e) => handleRowChange(e, 'tfurnance')} >
                                    <option value=''>Select Fuel</option>
                                    <option value='Furnance Oil'>Furnance Oil</option>
                                    <option value='Coal'>Coal</option>
                                    <option value='LP Gas'>LP Gas</option>
                                    <option value='Electricity'>Electricity</option>
                                    <option value='Other'>Other</option>
                                </select></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tfurnance, state.furnances)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>3. Machinery</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Type of Machinery</th>
                                <th>Capacity (kW)</th>
                                <th>Value (Rs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.machinery.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.type}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.value}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.machinery)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="type" value={state.tmachinery.type} onChange={(e) => handleRowChange(e, 'tmachinery')} /></td>
                                <td><input type="text" className="form-control" id="capacity" value={state.tmachinery.capacity} onChange={(e) => handleRowChange(e, 'tmachinery')} /></td>
                                <td><input type="text" className="form-control" id="value" value={state.tmachinery.value} onChange={(e) => handleRowChange(e, 'tmachinery')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tmachinery, state.machinery)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>4. Average Monthy Metal Processing (Kg)</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Metal</th>
                                <th>Melting</th>
                                <th>Heating</th>
                                <th>Temperature</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.metal_processing.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.metal}</td>
                                        <td>{item.melting}</td>
                                        <td>{item.heating}</td>
                                        <td>{item.temp}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.metal_processing)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='metal' defaultValue={state.tmetal_processing.metal} onChange={(e) => handleRowChange(e, 'tmetal_processing')} >
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
                                </select></td>
                                <td><input type="text" className="form-control" id="melting" value={state.tmetal_processing.melting} onChange={(e) => handleRowChange(e, 'tmetal_processing')} /></td>
                                <td><input type="text" className="form-control" id="heating" value={state.tmetal_processing.heating} onChange={(e) => handleRowChange(e, 'tmetal_processing')} /></td>
                                <td><input type="text" className="form-control" id="temp" value={state.tmetal_processing.temp} onChange={(e) => handleRowChange(e, 'tmetal_processing')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tmetal_processing, state.metal_processing)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>5. How to Source Raw Materials for Production?</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Type of Metal</th>
                                <th>Origin (Local/Imported) (kW)</th>
                                <th>State (Scrap/Virgin) (kW)</th>
                                <th>Amount (Kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.raw_materials.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.metal}</td>
                                        <td>{item.origin}</td>
                                        <td>{item.state}</td>
                                        <td>{item.amount}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.raw_materials)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="metal" value={state.raw_material.metal} onChange={(e) => handleRowChange(e, 'raw_material')} /></td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'raw_material', 'origin')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="local" name='origin' value='local' /><label className='form-check-label'>Local</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="imported" name='origin' value='imported' /><label className='form-check-label'>Imported</label></div>
                                </div></td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'raw_material', 'state')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="scrap" name='state' value='scrap' /><label className='form-check-label'>Scrap</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="virgin" name='state' value='virgin' /><label className='form-check-label'>Virgin</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="amount" value={state.raw_material.value} onChange={(e) => handleRowChange(e, 'raw_material')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.raw_material, state.raw_materials)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>6. Details of Employees</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Category</th>
                                <th>Local</th>
                                <th>Foreign</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.emp_details.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.type}</td>
                                        <td>{item.local}</td>
                                        <td>{item.foreign}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.emp_details)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='type' defaultValue={state.temp_details.type} onChange={(e) => handleRowChange(e, 'temp_details')} >
                                    <option value=''>Select Type</option>
                                    <option value='Managerial'>Managerial</option>
                                    <option value='Skilled Workers'>Skilled Workers</option>
                                    <option value='Semi-skilled Workers'>Semi-skilled Workers</option>
                                    <option value='Unskilled Workers'>Unskilled Workers</option>
                                    <option value='Contract Basis'>Contract Basis</option>
                                    <option value='Other'>Other</option>
                                </select></td>
                                <td><input type="text" className="form-control" id="local" value={state.temp_details.melting} onChange={(e) => handleRowChange(e, 'temp_details')} /></td>
                                <td><input type="text" className="form-control" id="foreign" value={state.temp_details.heating} onChange={(e) => handleRowChange(e, 'temp_details')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.temp_details, state.emp_details)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>C. Products and Markets</label></div>
                    <hr className='page-break' />

                    <label className='topic-text'>1. What Type of Products Being Produced?</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Name</th>
                                <th>State <br /> (Finished/Intermediate/Raw Materials)</th>
                                <th>Units</th>
                                <th>Weight (Kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.products.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.state}</td>
                                        <td>{item.units}</td>
                                        <td>{item.weight}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.products)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="name" value={state.product.name} onChange={(e) => handleRowChange(e, 'product')} /></td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'product', 'state')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="finished" name='state' value='finished' /><label className='form-check-label'>Finished</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="intermediate" name='state' value='intermediate' /><label className='form-check-label'>Intermdiate</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="raw_material" name='state' value='raw_material' /><label className='form-check-label'>Raw Material</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="units" value={state.product.units} onChange={(e) => handleRowChange(e, 'product')} /></td>
                                <td><input type="text" className="form-control" id="weight" value={state.product.weight} onChange={(e) => handleRowChange(e, 'product')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.product, state.products)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text mb-4 mt-2'>2. Market of the Products Being Sold (Local or Export)</label>

                    <div className='row mt-2 mb-1'>
                        <div className='col-md'>Local Retail, Customers Directly</div>
                        <div className='col-md'><input type="text" className="form-control" id="local_retail" value={state.markets.local_retail} onChange={(e) => handleRowChange(e, 'markets')} /></div>
                    </div>
                    <div className='row mt-1 mb-1'>
                        <div className='col-md'>Local Companies</div>
                        <div className='col-md'><input type="text" className="form-control" id="local_companies" value={state.markets.local_companies} onChange={(e) => handleRowChange(e, 'markets')} /></div>
                    </div>
                    <div className='row mt-1 mb-2'>
                        <div className='col-md'>Export/ Foreign Market</div>
                        <div className='col-md'><input type="text" className="form-control" id="export" value={state.markets.export} onChange={(e) => handleRowChange(e, 'markets')} /></div>
                    </div>

                    <div className='row mt-1 mb-2'>
                        <div className='col-md'>Other (Please Specify)</div>
                        <div className='col-md'><input type="text" className="form-control" id="name" value={state.other_markets.name} onChange={(e) => handleRowChange(e, 'other_markets')} placeholder='Market Name' /></div>
                        <div className='col-md'><input type="text" className="form-control" id="percentage" value={state.other_markets.percentage} onChange={(e) => handleRowChange(e, 'other_markets')} placeholder='Percentage' /></div>
                    </div>

                    <label className='topic-text mb-2 mt-2'>3. Annual Turnover of the Industry</label>

                    <div className="form-row">
                        <div className="form-group col-md">
                            <label>2016/2017 (Rs. Mn)</label>
                            <input type="text" className="form-control" id="y2016_2017" value={state.annual_turnover.y2016_2017} onChange={(e) => handleRowChange(e, 'annual_turnover')} />
                        </div>
                        <div className="form-group col-md">
                            <label>2017/2018 (Rs. Mn)</label>
                            <input type="text" className="form-control" id="y2017_2018" value={state.annual_turnover.y2017_2018} onChange={(e) => handleRowChange(e, 'annual_turnover')} />
                        </div>
                        <div className="form-group col-md">
                            <label>2018/2019 (Rs. Mn)</label>
                            <input type="text" className="form-control" id="y2018_2019" value={state.annual_turnover.y2018_2019} onChange={(e) => handleRowChange(e, 'annual_turnover')} />
                        </div>
                    </div>

                    <label className='topic-text'>4. Business Progression During Last Two Years</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Year</th>
                                <th>Direction (Increased/Decreased)</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Year 1</td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'business_progression', 'year1_dir')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="increase" name='dir1' value={"Increase"} /><label className='form-check-label'>Increase</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="decrease" name='dir1' value={"Decrease"} /><label className='form-check-label'>Decrease</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="year1" value={state.business_progression.year1} onChange={(e) => handleRowChange(e, 'business_progression')} /></td>
                            </tr>
                            <tr>
                                <td>Year 2</td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'business_progression', 'year2_dir')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="increase" name='dir2' value={"Increase"} /><label className='form-check-label'>Increase</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="decrease" name='dir2' value={"Decrease"} /><label className='form-check-label'>Decrease</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="year2" value={state.business_progression.year2} onChange={(e) => handleRowChange(e, 'business_progression')} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>5. Waste Generated (Metal and Other Realted Materials)</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Type of Waste</th>
                                <th>Amount Generated per Month (Kg)</th>
                                <th>Method of Disposal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.waste_generated.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.type}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.disposal}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.waste_generated)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="type" value={state.waste.type} onChange={(e) => handleRowChange(e, 'waste')} /></td>
                                <td><input type="text" className="form-control" id="amount" value={state.waste.amount} onChange={(e) => handleRowChange(e, 'waste')} /></td>
                                <td><input type="text" className="form-control" id="disposal" value={state.waste.disposal} onChange={(e) => handleRowChange(e, 'waste')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.waste, state.waste_generated)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>End of the Form</label></div>
                    <hr className='page-break' />

                    <div className='form-row'>
                        <div className="form-group col-md">
                            <label className='topic-text'>Name of the Interviewer</label>
                            <input type="text" className="form-control" id="interviewer" value={state.interviewer} onChange={handleChange} />
                        </div>

                        <div className="form-group col-md">
                            <label className='topic-text'>Year of the Interview</label>
                            <input type="text" className={"form-control" + (state.errors.yoi ? " error" : "")} id="yoi" value={state.yoi} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='btn btn-outline-dark' onClick={submitForm}>Submit</div>
                    </div>
                    <hr className='page-break' />
                </form>
            </div>
        </div>
    )
}

export default NewSurvey;