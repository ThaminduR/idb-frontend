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
        local_employees: '', //macro / small / medium
        foreign_employees: '',
        annual_turnover: { y2016_2017: '', y2017_2018: '', y2018_2019: '' },
        yoe: '', //year of establishment
        business_type: '', reg_no: '', reg_place: '', //busines type - sole proprietor /... 
        industry_reg: false, industry_reg_no: '', industry_reg_place: '', //industry_reg - whether company is register with the ministry
        land_area: '', land_value: '',
        building_area: '', building_value: '',
        machine_value: '', utilities_value: '', total_capital_investment: '',
        raw_mat_value: '', semi_goods_value: '', goods_value: '', total_working_capital: '',
        owned_site: false, rented_site: false,
        raw_materials: [], raw_material: { metal: '', origin: '', state: '', amount: '' },
        furnaces: [], tfurnace: { name: '', fuel: '', capacity: '', batchespd: '' }, //-----------------------new
        under_heating: '',
        floor_area: '',
        machinery: [], tmachinery: { type: '', capacity: '', value: '' },
        products: [], product: { metal: '', type: '', state: '', units: '', weight: '' },
        energy: [], tenergy: { type: '', units: '', state: '' },
        waste_generated: [], waste: { type: '', amount: '', disposal: '' },
        markets: { local_retail: '', local_companies: '', export: '' },
        other_markets: { name: '', percentage: '' },
        business_progression: { year1_dir: null, year1: '', year2_dir: null, year2: '' },
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
            successMessage: ''
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
                'local_employees': state.local_employees, //macro / small / medium //----------------------------------------------new
                'foreign_employees': state.foreign_employees, //macro / small / medium //----------------------------------------------new
                'yoe': state.yoe, //string
                'business_type': state.business_type, 'reg_no': state.reg_no, 'reg_place': state.reg_place, //----------------------------------------------new
                'industry_reg': state.industry_reg, 'industry_reg_no': state.industry_reg_no, 'industry_reg_place': state.industry_reg_place, //----------------------------------------------new
                'land_area': state.land_area, 'land_value': state.land_value,
                'building_area': state.building_area, 'building_value': state.building_value,
                'machine_value': state.machine_value, 'utilities_value': state.utilities_value, 'total_capital_investment': state.total_capital_investment,
                'raw_mat_value': state.raw_mat_value, 'semi_goods_value': state.semi_goods_value, 'goods_value': state.goods_value, 'total_working_capital': state.total_working_capital,
                'owned_site': state.owned_site,
                'rented_site': state.rented_site,
                'furnace_capacity': state.furnace_capacity, //array
                'under_heating': state.under_heating, //----------------------------------------------new
                'floor_area': state.floor_area, //----------------------------------------------new
                'furnaces': state.furnaces, //array
                'machinery': state.machinery, //array
                'metal_processing': state.metal_processing, //array
                'raw_materials': state.raw_materials, //array
                'emp_details': state.emp_details, //array
                'products': state.products, //array
                'markets': state.markets, //dictionary
                'other_markets': state.other_markets, //dictionary
                'annual_turnover': state.annual_turnover, //dictionary
                'business_progression': state.business_progression, //dictionary
                'energy': state.energy, //----------------------------------------------new
                'waste_generated': state.waste_generated, //array
                'interviewer': state.interviewer, //string
                'yoi': state.yoi //string
            }
            axios.post('/admin/addSurvey', payload)
                .then(function (response) {
                    if (response.data.code === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': response.data.message,
                            'errorMessage': ''
                        }))
                        setTimeout(() => {
                            window.location.reload()
                        }, 2500)
                        console.log(response.data.message)
                        return
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
                        return
                    }
                })
                .catch(function (error) {
                    setState(prevState => ({
                        ...prevState,
                        'errorMessage': 'Error Occured',
                        'successMessage': ''
                    }))
                    console.log(error);
                    return
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
            <div className={"alert newsur-alert alert-danger" + ((state.errorMessage) ? ' errorMessage1' : ' errorMessage2')} role="alert">
                {state.errorMessage}
                <button type="button" className="close ml-1" aria-label="Close" id='errorMessage' onClick={(e) => closeError(e)} ><i className="fa fa-times" aria-hidden="true"></i></button>
            </div>
            <div className={"alert newsur-alert alert-success" + ((state.successMessage) ? ' errorMessage1' : ' errorMessage2')} role="alert">
                {state.successMessage}
                <button type="button" className="close ml-1" aria-label="Close" id='successMessage' onClick={(e) => closeError(e)} ><i className="fa fa-times" aria-hidden="true"></i></button>
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
                            <input type="text" className="form-control" id="telenumber" value={state.telenumber} placeholder='10 Digit Number - 07XXXXXXXX' onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label >Email</label>
                            <input type="text" className="form-control" id="email" value={state.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Fax</label>
                            <input type="text" className="form-control" id="fax" value={state.fax} placeholder='10 Digit Number - 07XXXXXXXX' onChange={handleChange} />
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

                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.proprietor)} ><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="name" value={state.tpropr.name} onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><input type="text" className="form-control" id="designation" value={state.tpropr.designation} onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><input type="text" className="form-control" id="tele" value={state.tpropr.tele} placeholder='10 Digit Number - 07XXXXXXXX' onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
                                <td><input type="text" className="form-control" id="mobile" value={state.tpropr.mobile} placeholder='10 Digit Number - 07XXXXXXXX' onChange={(e) => handleRowChange(e, 'tpropr')} /></td>
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
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="macro_turn" name='turnover' value="Macro" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td>16-250</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="small_turn" name='turnover' value="Small" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Medium</td>
                                        <td>251-750</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="medium_turn" name='turnover' value="Medium" /></div></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className='col-md mt-2 mb-2' onChange={(e) => handleRadioChange(e, 'local_employees')}>
                            <label>Number of Local Employees</label>
                            <table className='table table-striped table-bordered'>
                                <tbody>
                                    <tr>
                                        <td>0-10</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="macro_emp" name='local_employees' value="Macro" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>11-50</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="small_emp" name='local_employees' value="Small" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>51-300</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="medium_emp" name='local_employees' value="Medium" /></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='col-md mt-2 mb-2' onChange={(e) => handleRadioChange(e, 'foreign_employees')}>
                            <label>Number of Foreign Employees</label>
                            <table className='table table-striped table-bordered'>
                                <tbody>
                                    <tr>
                                        <td>0-10</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="macro_emp" name='foreign_employees' value="Macro" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>11-50</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="small_emp" name='foreign_employees' value="Small" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>51-300</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="medium_emp" name='foreign_employees' value="Medium" /></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <label className='topic-text mb-2 mt-2'>Annual Turnover of the Industry</label>

                    <div className="form-row">
                        <div className="form-group col-md">
                            <label>2016/2017 (Rs. Mn)</label>
                            <input type="text" className="form-control" id="y2016_2017" value={state.annual_turnover.y2016_2017} placeholder='In Mn.Rupeess (Value Only)' onChange={(e) => handleRowChange(e, 'annual_turnover')} />
                        </div>
                        <div className="form-group col-md">
                            <label>2017/2018 (Rs. Mn)</label>
                            <input type="text" className="form-control" id="y2017_2018" value={state.annual_turnover.y2017_2018} placeholder='In Mn.Rupeess (Value Only)' onChange={(e) => handleRowChange(e, 'annual_turnover')} />
                        </div>
                        <div className="form-group col-md">
                            <label>2018/2019 (Rs. Mn)</label>
                            <input type="text" className="form-control" id="y2018_2019" value={state.annual_turnover.y2018_2019} placeholder='In Mn.Rupeess (Value Only)' onChange={(e) => handleRowChange(e, 'annual_turnover')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className='topic-text'>7. Year of Establishment</label>
                        <input type="text" className="form-control" id="yoe" value={state.yoe} placeholder='4 Digit Number' onChange={handleChange} />
                    </div>

                    <label className='topic-text'>8. Ownership and Registration of the Business</label>
                    <br />
                    <label className='mt-2 mb-2'>Type of Business Registration</label>
                    <div onChange={(e) => handleRadioChange(e, 'business_type')}>
                        <table className="table table-striped table-bordered">
                            <tbody>

                                <tr>
                                    <td>Sole Proprietor</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="sole_business" name='business_type' value="Sole Proprietor" /></div></td>
                                </tr>
                                <tr>
                                    <td>Partnership</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="part_business" name='business_type' value="Partnership" /></div></td>
                                </tr>
                                <tr>
                                    <td>Limited Liability</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="limited_business" name='business_type' value="Limited Liability" /></div></td>

                                </tr>
                                <tr>
                                    <td>Cooperative</td>
                                    <td><div className="form-check"><input className="form-check-input" type="radio" id="coop_business" name='business_type' value="Cooperative" /></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <table className='mb-4'>
                        <tbody>
                            <tr>
                                <td>Registration No.</td>
                                <td><input type="text" className="form-control" id="reg_no" value={state.reg_no} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Place of Registration</td>
                                <td><input type="text" className="form-control" id="reg_place" value={state.reg_place} onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='mt-2 mb-2'>Registration Under Ministry</label>
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
                            <tr>
                                <td>Place of Registration</td>
                                <td><input type="text" className="form-control" id="industry_reg_place" value={state.industry_reg_place} onChange={handleChange} /></td>
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
                                <td><div className="form-group"><input type="text" className="form-control" id="land_area" value={state.land_area} placeholder='Perches (Value Only)' onChange={handleChange} /></div></td>
                                <td><div className="form-group col"><input type="text" className="form-control" id="land_value" value={state.land_value} placeholder='In Rupees (Value Only)' onChange={handleChange} /></div></td>
                            </tr>
                            <tr>
                                <td>Building</td>
                                <td><div className="form-group"><input type="text" className="form-control" id="building_area" value={state.building_area} placeholder='sqft (Value Only)' onChange={handleChange} /></div></td>
                                <td><div className="form-group col"><input type="text" className="form-control" id="building_value" value={state.building_value} placeholder='In Rupees (Value Only)' onChange={handleChange} /></div></td>
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
                                <td><input type="text" className="form-control" id="machine_value" value={state.machine_value} placeholder='In Rupees (Value Only)' onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Utilities</td>
                                <td><input type="text" className="form-control" id="utilities_value" value={state.utilities_value} placeholder='In Rupees (Value Only)' onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td><input type="text" className="form-control" id="total_capital_investment" value={state.total_capital_investment} placeholder='In Rupees (Value Only)' onChange={handleChange} /></td>
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
                                <td><input type="text" className="form-control" id="raw_mat_value" value={state.raw_mat_value} placeholder='In Rupees (Value Only)' onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Semi Finished Goods</td>
                                <td><input type="text" className="form-control" id="semi_goods_value" value={state.semi_goods_value} placeholder='In Rupees (Value Only)' onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Finished Goods</td>
                                <td><input type="text" className="form-control" id="goods_value" value={state.goods_value} placeholder='In Rupees (Value Only)' onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td ><p className='bold'>Total</p></td>
                                <td><input type="text" className="form-control" id="total_working_capital" value={state.total_working_capital} placeholder='In Rupees (Value Only)' onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label>9.3 Ownership of the Business</label>
                    {/* <div onChange={(e) => handleRadioChange(e, 'site_type')}> */}
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
                                <td><div className="form-check form-check-inline"><input className="form-check-input" type="checkbox" checked={state.owned_site} id="owned_site" onChange={handleCheckboxChange} /></div></td>
                                {/* <td><div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="owned_site" name='site_type' value='owned' /></div></td> */}
                            </tr>
                            <tr>
                                <td>Rented/ Leased Premises</td>
                                <td><div className="form-check form-check-inline"><input className="form-check-input" type="checkbox" checked={state.rented_site} id="rented_site" onChange={handleCheckboxChange} /></div></td>
                                {/* <td><div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="rented_site" name='site_type' value='rented' /></div></td> */}
                            </tr>
                        </tbody>
                    </table>
                    {/* </div> */}

                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>B. Operational and Technical Details of Business</label></div>
                    <hr className='page-break' />

                    <label className='topic-text'>1. Which Metals Do the Industry Use and the Capacity of Them?</label>

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
                                        <td>{item.amount}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.raw_materials)} ><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='metal' defaultValue={state.raw_material.metal} onChange={(e) => handleRowChange(e, 'raw_material')} >
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
                                <td><div onChange={(e) => handleRowRadioChange(e, 'raw_material', 'origin')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="local" name='origin' value='Local' /><label className='form-check-label'>Local</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="imported" name='origin' value='Imported' /><label className='form-check-label'>Imported</label></div>
                                </div></td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'raw_material', 'state')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="scrap" name='state' value='Scrap' /><label className='form-check-label'>Scrap</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="virgin" name='state' value='Virgin' /><label className='form-check-label'>Virgin</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="amount" value={state.raw_material.value} placeholder='In kg (Value Only)' onChange={(e) => handleRowChange(e, 'raw_material')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.raw_material, state.raw_materials)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>2. Type of Furnaces and Fuel Being Used</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Furnace</th>
                                <th>Capacity (kg / Batch)</th>
                                <th>Batches / Day</th>
                                <th>Fuel</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.furnaces.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.batchespd}</td>
                                        <td>{item.fuel}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.furnaces)} ><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='name' defaultValue={state.tfurnace.name} onChange={(e) => handleRowChange(e, 'tfurnace')} >
                                    <option value=''>Select Furnace</option>
                                    <option value='Cupola furnace'>Cupola Furnace</option>
                                    <option value='Pit furnace'>Pit Furnace</option>
                                    <option value='Induction furnace'>Induction Furnace</option>
                                    <option value='Tilt furnace'>Tilt Furnace</option>
                                    <option value='Other'>Other</option>
                                </select></td>
                                <td><input type="text" className="form-control" id="capacity" value={state.tfurnace.capacity} placeholder='In kg / Batch (Value Only)' onChange={(e) => handleRowChange(e, 'tfurnace')} /></td>
                                <td><input type="text" className="form-control" id="batchespd" value={state.tfurnace.batchespd} placeholder='In Batch / Day (Value Only)' onChange={(e) => handleRowChange(e, 'tfurnace')} /></td>
                                <td><select className="form-control" id='fuel' defaultValue={state.tfurnace.fuel} onChange={(e) => handleRowChange(e, 'tfurnace')} >
                                    <option value=''>Select Fuel</option>
                                    <option value='Furnace Oil'>Furnace Oil</option>
                                    <option value='Coal'>Coal</option>
                                    <option value='LP Gas'>LP Gas</option>
                                    <option value='Electricity'>Electricity</option>
                                    <option value='Other'>Other</option>
                                </select></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tfurnace, state.furnaces)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="form-group">
                        <label className='topic-text'>Under Heating Process - (Smithy or Forging)</label>
                        <input type="text" className="form-control" id="under_heating" value={state.under_heating} placeholder='kg / month (Value Only)' onChange={handleChange} />
                    </div>

                    <label className='topic-text'>3. Plant, Machinery & Equipment</label>

                    <div className="form-group">
                        <label className='topic-text'>Plant Floor Area</label>
                        <input type="text" className="form-control" id="floor_area" value={state.floor_area} placeholder='In Square Meters (Value Only)' onChange={handleChange} />
                    </div>


                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Type of Machinery</th>
                                <th>Capacity (kW)</th>
                                <th>Value (Rs)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.machinery.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.type}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.value}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.machinery)} ><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="type" value={state.tmachinery.type} onChange={(e) => handleRowChange(e, 'tmachinery')} /></td>
                                <td><input type="text" className="form-control" id="capacity" value={state.tmachinery.capacity} placeholder='In kW (Value Only)' onChange={(e) => handleRowChange(e, 'tmachinery')} /></td>
                                <td><input type="text" className="form-control" id="value" value={state.tmachinery.value} placeholder='In Rupees (Value Only)' onChange={(e) => handleRowChange(e, 'tmachinery')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tmachinery, state.machinery)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Note: 1hp = 746w and 1000w = 1kw</p>

                    <label className='topic-text'>4. Present Average Production - (Kg / Month)</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Metal</th>
                                <th>Product</th>
                                <th>State <br /> (Existing / Expected)</th>
                                <th>Units</th>
                                <th>Weight (Kg)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.products.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.metal}</td>
                                        <td>{item.type}</td>
                                        <td>{item.state}</td>
                                        <td>{item.units}</td>
                                        <td>{item.weight}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.products)} ><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='metal' defaultValue={state.product.metal} onChange={(e) => handleRowChange(e, 'product')} >
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
                                <td><select className="form-control" id='type' defaultValue={state.product.type} onChange={(e) => handleRowChange(e, 'product')} >
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
                                </select></td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'product', 'state')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="existing" name='state' value='Existing' /><label className='form-check-label'>Existing</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="expected" name='state' value='Expected' /><label className='form-check-label'>Expected</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="units" value={state.product.units} placeholder='Number of Units' onChange={(e) => handleRowChange(e, 'product')} /></td>
                                <td><input type="text" className="form-control" id="weight" value={state.product.weight} placeholder='In kg (Value Only)' onChange={(e) => handleRowChange(e, 'product')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.product, state.products)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='topic-text'>5. Energy Consumption - Monthly</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Type</th>
                                <th>Units</th>
                                <th>Requirement Type (Existing / Expected)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.energy.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.type}</td>
                                        <td>{item.units}</td>
                                        <td>{item.state}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.energy)} ><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><select className="form-control" id='type' defaultValue={state.tenergy.type} onChange={(e) => handleRowChange(e, 'tenergy')} >
                                    <option value=''>Select Type</option>
                                    <option value='Electricity'>Electricity</option>
                                    <option value='Furness Oil'>Furness Oil</option>
                                    <option value='Coke'>Coke</option>
                                    <option value='Other'>Other</option>
                                </select></td>
                                <td><input type="text" className="form-control" id="units" value={state.tenergy.units} placeholder='Number of Units' onChange={(e) => handleRowChange(e, 'tenergy')} /></td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'tenergy', 'state')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="existing" name='estate' value='Existing' /><label className='form-check-label'>Existing</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="expected" name='estate' value='Expected' /><label className='form-check-label'>Expected</label></div>
                                </div></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.tenergy, state.energy)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>


                    <label className='topic-text'>6. Waste Generated (Metal and Other Realted Materials)</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Type of Waste</th>
                                <th>Amount Generated per Month (Kg)</th>
                                <th>Method of Disposal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.waste_generated.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.type}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.disposal}</td>
                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handleRowDelete(e, key, state.waste_generated)} ><i className="fa fa-times" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="type" value={state.waste.type} onChange={(e) => handleRowChange(e, 'waste')} /></td>
                                <td><input type="text" className="form-control" id="amount" value={state.waste.amount} placeholder='In kg (Value Only)' onChange={(e) => handleRowChange(e, 'waste')} /></td>
                                <td><input type="text" className="form-control" id="disposal" value={state.waste.disposal} onChange={(e) => handleRowChange(e, 'waste')} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handleRowSubmit(e, state.waste, state.waste_generated)}>Add</button></td>
                            </tr>
                        </tbody>
                    </table>


                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>C. Products and Markets</label></div>
                    <hr className='page-break' />

                    <label className='topic-text mb-4 mt-2'>1. Market of the Products Being Sold (Local or Export)</label>

                    <div className='row mt-2 mb-1'>
                        <div className='col-md'>Local Retail, Customers Directly</div>
                        <div className='col-md'><input type="text" className="form-control" id="local_retail" value={state.markets.local_retail} placeholder='Percentage (Value Only Without %)' onChange={(e) => handleRowChange(e, 'markets')} /></div>
                    </div>
                    <div className='row mt-1 mb-1'>
                        <div className='col-md'>Local Companies</div>
                        <div className='col-md'><input type="text" className="form-control" id="local_companies" value={state.markets.local_companies} placeholder='Percentage (Value Only Without %)' onChange={(e) => handleRowChange(e, 'markets')} /></div>
                    </div>
                    <div className='row mt-1 mb-2'>
                        <div className='col-md'>Export/ Foreign Market</div>
                        <div className='col-md'><input type="text" className="form-control" id="export" value={state.markets.export} placeholder='Percentage (Value Only Without %)' onChange={(e) => handleRowChange(e, 'markets')} /></div>
                    </div>

                    <div className='row mt-1 mb-2'>
                        <div className='col-md'>Other (Please Specify)</div>
                        <div className='col-md'><input type="text" className="form-control" id="name" value={state.other_markets.name} onChange={(e) => handleRowChange(e, 'other_markets')} placeholder='Market Name' /></div>
                        <div className='col-md'><input type="text" className="form-control" id="percentage" value={state.other_markets.percentage} onChange={(e) => handleRowChange(e, 'other_markets')} placeholder='Percentage' /></div>
                    </div>

                    <label className='topic-text'>2.Financial Progress During Last Two Years</label>

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
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="increase" name='dir1' value="Increase" /><label className='form-check-label'>Increase</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="decrease" name='dir1' value="Decrease" /><label className='form-check-label'>Decrease</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="year1" value={state.business_progression.year1} placeholder='Percentage (Value Only Without %)' onChange={(e) => handleRowChange(e, 'business_progression')} /></td>
                            </tr>
                            <tr>
                                <td>Year 2</td>
                                <td><div onChange={(e) => handleRowRadioChange(e, 'business_progression', 'year2_dir')} >
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="increase" name='dir2' value="Increase" /><label className='form-check-label'>Increase</label></div>
                                    <br />
                                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" id="decrease" name='dir2' value="Decrease" /><label className='form-check-label'>Decrease</label></div>
                                </div></td>
                                <td><input type="text" className="form-control" id="year2" value={state.business_progression.year2} placeholder='Percentage (Value Only Without %)' onChange={(e) => handleRowChange(e, 'business_progression')} /></td>
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
                            <input type="text" className={"form-control" + (state.errors.yoi ? " error" : "")} id="yoi" placeholder='4 Digit Number' value={state.yoi} onChange={handleChange} />
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