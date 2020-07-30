import React, { useState, useEffect } from 'react'
import './FormView.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function FormView(props) {

    document.title = 'All Records'

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        statechange: '',
        successMessage: null,
        errorMessage: null,
        //API State
        hasReq: false,
        requestPending: false,
        dataVerify: false,
        id: '',
        //Form Data
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
        proprietor: [],
        turnover: '',
        local_employees: '',
        foreign_employees: '',
        yoe: '',
        business_type: '', reg_no: '', reg_place: '',
        industry_reg: true, industry_reg_no: '', industry_reg_place: '',
        land_area: '', land_value: '',
        building_area: '', building_value: '',
        machine_value: '', utilities_value: '', total_capital_investment: '',
        raw_mat_value: '', semi_goods_value: '', goods_value: '', total_working_capital: '',
        site_type: '',
        furnace_capacity: [],
        furnaces: [],
        machinery: [],
        metal_processing: [],
        raw_materials: [],
        emp_details: [],
        products: [],
        energy: [],
        markets: { local_retail: '', local_companies: '', export: '' },
        other_markets: { name: '', percentage: '' },
        annual_turnover: { y2016_2017: '', y2017_2018: '', y2018_2019: '' },
        business_progression: { year1_dir: '', year1: '', year2_dir: '', year2: '' },
        waste_generated: [],
        interviewer: '',
        yoi: ''
    })

    const getRecordData = () => {
        axios.post('/admin/viewCompany', {
            'id': state.id
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        requestPending: false,
                        companyName: res.data.surveyData.company[0].name,
                        province: res.data.surveyData.location[0].province,
                        district: res.data.surveyData.location[0].district,
                        dsDivision: res.data.surveyData.location[0].ds_division,
                        gnDivision: res.data.surveyData.location[0].gn_division,
                        latitude: res.data.surveyData.location[0].latitude,
                        longitude: res.data.surveyData.location[0].longitude,
                        address: res.data.surveyData.company[0].address,
                        telenumber: res.data.surveyData.contact_details[0].telephone,
                        email: res.data.surveyData.contact_details[0].email,
                        fax: res.data.surveyData.contact_details[0].fax,
                        website: res.data.surveyData.contact_details[0].website,
                        proprietor: res.data.surveyData.propertier_contact_person,
                        turnover: res.data.surveyData.company_category[0].turnover_category,
                        local_employees: res.data.surveyData.company_category[0].local_employee_category, //macro / small / medium
                        foreign_employees: res.data.surveyData.company_category[0].foreign_employee_category,
                        annual_turnover: res.data.surveyData.annual_turnover[0],
                        yoe: res.data.surveyData.company[0].year_established, //year of establishment
                        business_type: res.data.surveyData.ownership_registration[0].business_type, reg_no: res.data.surveyData.ownership_registration[0].reg_no, reg_place: res.data.surveyData.ownership_registration[0].reg_place, //busines type - sole proprietor /... 
                        industry_reg: res.data.surveyData.ownership_registration[0].industry_reg, industry_reg_no: res.data.surveyData.ownership_registration[0].industry_reg_no, industry_reg_place: res.data.surveyData.ownership_registration[0].industry_reg_place, //industry_reg - whether company is register with the ministry
                        land_area: res.data.surveyData.land_capital[0].land_area, land_value: res.data.surveyData.land_capital[0].land_value,
                        building_area: res.data.surveyData.building_capital[0].building_area, building_value: res.data.surveyData.building_capital[0].building_value,
                        machine_value: res.data.surveyData.capital_investment[0].plant_machinery, utilities_value: res.data.surveyData.capital_investment[0].utilities, total_capital_investment: res.data.surveyData.capital_investment[0].total,
                        raw_mat_value: res.data.surveyData.working_capital[0].raw_material, semi_goods_value: res.data.surveyData.working_capital[0].semi_finished, goods_value: res.data.surveyData.working_capital[0].finished,
                        owned_site: res.data.surveyData.property_ownership[0].owned, rented_site: res.data.surveyData.property_ownership[0].rented,
                        raw_materials: res.data.surveyData.raw_materials,
                        furnaces: res.data.surveyData.furnace,
                        under_heating: res.data.surveyData.under_heating[0].usage_steel,
                        floor_area: res.data.surveyData.plant_floor[0].area,
                        machinery: res.data.surveyData.machinery,
                        products: res.data.surveyData.products,
                        energy: res.data.surveyData.energy_consumption,
                        waste_generated: res.data.surveyData.waste_generated,
                        markets: { local_retail: res.data.surveyData.products_sold[0].local_retails, local_companies: res.data.surveyData.products_sold[0].local_companies, export: res.data.surveyData.products_sold[0].foreigh_market },
                        other_markets: { name: res.data.surveyData.other_product_sold[0].description, percentage: res.data.surveyData.other_product_sold[0].percentage },
                        business_progression: { year1_dir: res.data.surveyData.business_progression[0].yr1_dir, year1: res.data.surveyData.business_progression[0].yr1_percentage, year2_dir: res.data.surveyData.business_progression[0].yr2_dir, year2: res.data.surveyData.business_progression[0].yr2_percentage },
                        interviewer: res.data.surveyData.interviewer[0].name,
                        yoi: res.data.surveyData.company[0].surveyed_year
                    }))
                } else if (res.code === 401) {
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
                    errorMessage: "Error",
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
                id: data,
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

    const deleteRecord = () => {
        axios.post('/admin/deleteCompany', {
            'id': state.id,
            'name': state.companyName,
            'telenumber': state.telephone ? state.telephone : "",
            'address': state.address
        })
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        successMessage: "Record Deleted Succesfully"
                    }))
                    setTimeout(() => {
                        history.push('/AllRecords')
                    }, 1500)
                } else if (res.data.code === 401) {
                    setAuthTokens(res.data)
                    history.replace('/error')
                }
                else {
                    setState(prevState => ({
                        ...prevState,
                        'errorMessage': res.data.message,
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
            })
    }

    const closeError = (e) => {
        e.preventDefault()
        setState(prevState => ({
            ...prevState,
            errorMessage: '',
            successMessage: ''
        }))
    }

    return (
        <div className='formview-background'>
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
                                <hr className='page-break' />
                                <div className='main-con'><label className='main-text'>A. Basic Industry Data</label></div>
                                <hr className='page-break' />
                                <div className="form-group">
                                    <label className='topic-text'>1. Name of the Company/Industry</label>
                                    <p>{state.companyName}</p>
                                </div>
                                <label className='topic-text'>2. Location</label>
                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>Province</label>
                                        <p>{state.province}</p>
                                    </div>
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>District</label>
                                        <p>{state.district}</p>
                                    </div>
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>DS Division</label>
                                        <p>{state.dsDivision ? state.dsDivision : "N/A"}</p>
                                    </div>
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>GN Division</label>
                                        <p>{state.gnDivision ? state.gnDivision : "N/A"}</p>
                                    </div>
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>Latitude</label>
                                        <p>{state.latitude ? state.latitude : "N/A"}</p>
                                    </div>
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>Longitude</label>
                                        <p>{state.longitude ? state.longitude : "N/A"}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className='topic-text'>3. Address</label>
                                    <p>{state.address ? state.address : "N/A"}</p>
                                </div>

                                <label className='topic-text'>4. Contact Details</label>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className='sm-lbl'>Tele</label>
                                        <p>{state.telenumber ? state.telenumber : "N/A"}</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='sm-lbl'>Email</label>
                                        <p>{state.email ? state.email : "N/A"}</p>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className='sm-lbl'>Fax</label>
                                        <p>{state.fax ? state.fax : "N/A"}</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className='sm-lbl'>Website</label>
                                        <p>{state.website ? state.website : "N/A"}</p>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.proprietor.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.name}</td>
                                                    <td>{item.designation}</td>
                                                    <td>{item.telephone}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.email}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>

                                <label className='topic-text'>6. What is the category that the organization belongs to?</label>

                                <div className='row radio-row'>
                                    <div className='col'>
                                        <label className='sm-lbl'>Annual Turnover in last 1-2 years</label>
                                        <br />
                                        <p>{state.turnover ? state.turnover : "N/A"}</p></div>
                                    <div className='col'>
                                        <label className='sm-lbl'>Number of Local Employees</label>
                                        <br />
                                        <p>{state.local_employees ? state.local_employees : "N/A"}</p>
                                    </div>
                                    <div className='col'>
                                        <label className='sm-lbl'>Number of Foreign Employees</label>
                                        <br />
                                        <p>{state.foreign_employees ? state.foreign_employees : "N/A"}</p>
                                    </div>
                                </div>

                                <label className='topic-text mb-2 mt-2'>Annual Turnover of the Industry</label>

                                <div className="form-row">
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>2016/2017 (Rs. Mn)</label>
                                        <p>{state.annual_turnover.y2016_2017}</p>
                                    </div>
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>2017/2018 (Rs. Mn)</label>
                                        <p>{state.annual_turnover.y2017_2018}</p>
                                    </div>
                                    <div className="form-group col-md">
                                        <label className='sm-lbl'>2018/2019 (Rs. Mn)</label>
                                        <p>{state.annual_turnover.y2018_2019}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className='topic-text'>7. Year of Establishment</label>
                                    <p>{state.yoe ? state.yoe : "N/A"}</p>                                    </div>

                                <label className='topic-text'>8. Ownership and Registration of the Business</label>
                                <br />
                                <label className='mt-2 mb-2 sm-lbl'>Type of Business Registration</label>
                                <p>{state.business_type ? state.business_type : "N/A"} - {state.reg_no ? state.reg_no : "N/A"} - {state.reg_place ? state.reg_place : "N/A"}</p>

                                <label className='mt-2 mb-2 sm-lbl'>Registration Under Ministry</label>
                                <p>{state.industry_reg ? ("Yes - " + state.industry_reg_no + " - " + state.industry_reg_place) : "No"}</p>

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
                                            <td><div className="form-group"> <p>{state.land_area}</p></div></td>
                                            <td><div className="form-group col"> <p>{state.land_value}</p></div></td>
                                        </tr>
                                        <tr>
                                            <td>Building</td>
                                            <td><div className="form-group"> <p>{state.building_area}</p></div></td>
                                            <td><div className="form-group col"> <p>{state.building_value}</p></div></td>
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
                                            <td> <p>{state.machine_value}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Utilities</td>
                                            <td> <p>{state.utilities_value}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td> <p>{state.total_capital_investment}</p></td>
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
                                            <td> <p>{state.raw_mat_value}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Semi Finished Goods</td>
                                            <td> <p>{state.semi_goods_value}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Finished Goods</td>
                                            <td> <p>{state.goods_value}</p></td>
                                        </tr>
                                        <tr>
                                            <td ><p className='bold'>Total</p></td>
                                            <td> <p>{state.raw_mat_value + state.semi_goods_value + state.goods_value}</p></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <label>9.3 Ownership of the Business</label>
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
                                            <td> <p>{state.owned_site ? "Yes" : "No"}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Rented/ Leased Premises</td>
                                            <td> <p>{state.rented_site ? "Yes" : "No"}</p></td>
                                        </tr>
                                    </tbody>
                                </table>

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
                                                    <td>{item.metal_usage}</td>
                                                </tr>)
                                        })}
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
                                                    <td>{item.furnace_type}</td>
                                                    <td>{item.capacity}</td>
                                                    <td>{item.batches}</td>
                                                    <td>{item.fuel}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label className='topic-text'>Under Heating Process - (Smithy or Forging)</label>
                                    <p>{state.under_heating}</p>
                                </div>

                                <label className='topic-text'>3. Plant, Machinery & Equipment</label>

                                <div className="form-group">
                                    <label className='sm-lbl'>Plant Floor Area</label>
                                    <p>{state.floor_area}</p>
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
                                                    <td>{item.machine_type}</td>
                                                    <td>{item.capacity}</td>
                                                    <td>{item.value}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>

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
                                                    <td>{item.product}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.units}</td>
                                                    <td>{item.weight}</td>
                                                </tr>)
                                        })}
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
                                                </tr>)
                                        })}
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
                                                    <td>{item.type_waste}</td>
                                                    <td>{item.amount_waste}</td>
                                                    <td>{item.dispose_method}</td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>


                                <hr className='page-break' />
                                <div className='main-con'><label className='main-text'>C. Products and Markets</label></div>
                                <hr className='page-break' />

                                <label className='topic-text mb-4 mt-2'>1. Market of the Products Being Sold (Local or Export)</label>

                                <div className='row mt-2 mb-1'>
                                    <div className='col-md'>Local Retail, Customers Directly</div>
                                    <div className='col-md'><p>{state.markets.local_retail}</p></div>
                                </div>
                                <div className='row mt-1 mb-1'>
                                    <div className='col-md'>Local Companies</div>
                                    <div className='col-md'><p>{state.markets.local_companies}</p></div>
                                </div>
                                <div className='row mt-1 mb-2'>
                                    <div className='col-md'>Export/ Foreign Market</div>
                                    <div className='col-md'><p>{state.markets.export}</p></div>
                                </div>

                                <div className='row mt-1 mb-2'>
                                    <div className='col-md'>Other (Please Specify)</div>
                                    <div className='col-md'><p>{state.other_markets.name}</p></div>
                                    <div className='col-md'><p>{state.other_markets.percentage}</p></div>
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
                                            <td><p>{state.business_progression.year1_dir ? state.business_progression.year1_dir : "N/A"}</p></td>
                                            <td><p>{state.business_progression.year1}</p></td>
                                        </tr>
                                        <tr>
                                            <td>Year 2</td>
                                            <td><p>{state.business_progression.year2_dir ? state.business_progression.year2_dir : "N/A"}</p></td>
                                            <td><p>{state.business_progression.year2}</p></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <hr className='page-break' />
                                <div className='main-con'><label className='main-text'>End of the Form</label></div>
                                <hr className='page-break' />

                                <div className='form-row'>
                                    <div className="form-group col-md">
                                        <label className='topic-text'>Name of the Interviewer</label>
                                        <p>{state.interviewer ? state.interviewer : "N/A"}</p>
                                    </div>

                                    <div className="form-group col-md">
                                        <label className='topic-text'>Year of the Interview</label>
                                        <p>{state.yoi}</p>
                                    </div>
                                </div>
                                <hr className='page-break mt-4 mb-4' />
                                <hr className='page-break mt-4 mb-4' />
                                <div className="container">
                                    <button className="btn btn-outline-danger" onClick={deleteRecord}>Delete This</button>
                                </div>
                                <hr className='page-break mt-4 mb-4' />
                                <hr className='page-break mt-4 mb-4' />
                            </div>

                        </div>
                }
            </div>
        </div>
    )
}

export default FormView;