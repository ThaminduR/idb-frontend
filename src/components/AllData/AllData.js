import React, { useState } from 'react'
import './AllData.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../services/AuthenticationService'

function AllData(props) {

    document.title = 'Add New Data'

    const history = useHistory()

    const { setAuthTokens } = useAuth()

    const [state, setState] = useState({
        //t infront of variable names indicate temporary varaibles
        statechange: '',
        successMessage: null,
        errorMessage: null,
        hasReq: false,
        errors: {
            name: false,
            province: false,
            district: false,
            yoi: false
        },
        companyName: '-',
        province: '-',
        district: '-',
        dsDivision: '-',
        gnDivision: '-',
        latitude: '-',
        longitude: '-',
        address: '-',
        telenumber: '-',
        email: '-',
        fax: '-',
        website: '-',
        proprietor: [],
        turnover: '-',
        employees: '-', //macro / small / medium
        yoe: '-', //year of establishment
        business_type: '-', reg_no: '-', //busines type - sole proprietor /... 
        industry_reg: true, industry_reg_no: '-', //industry_reg - whether company is register with the ministry
        land_area: '-', land_value: '-',
        building_area: '-', building_value: '-',
        machine_value: '-', utilities_value: '-', total_capital_investment: '-',
        raw_mat_value: '-', semi_goods_value: '-', goods_value: '-', total_working_capital: '-',
        site_type: '-', //owned or rented
        furnace_capacity: [],
        furnaces: [],
        machinery: [],
        metal_processing: [],
        raw_materials: [],
        emp_details: [],
        products: [],
        markets: { local_retail: '-', local_companies: '-', export: '-' },
        other_markets: { name: '-', percentage: '-' },
        annual_turnover: { y2016_2017: '-', y2017_2018: '-', y2018_2019: '-' },
        business_progression: { year1_dir: '-', year1: '-', year2_dir: '-', year2: '-' },
        waste_generated: [],
        interviewer: '-',
        yoi: '-'

    })

    const getData = () => {
        if (state.hasReq) {
            return
        }
        setState(prevState => ({
            ...prevState,
            hasReq: true
        }))
        axios.post('/admin/getalldata', [props.compnayName])
            .then(function (res) {
                if (res.data.code === 200) {
                    setState(prevState => ({
                        ...prevState,
                        successMessage: 'Data Retireved'
                    }))
                } else if (res.code === 401) {
                    setAuthTokens(res.data)
                    history.replace('/error')
                } else {
                    setState(prevState => ({
                        ...prevState,
                        errorMessage: res.data.message
                    }))
                }

            }).catch(function (err) {
                setState(prevState => ({
                    ...prevState,
                    errorMessage: err
                }))
            })
    }

    if (!state.hasReq) {
        getData()
    }


    return (
        <div className='alldata-background'>
            <div className='container form-card'>
                <form>
                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>A. Basic Industry Data</label></div>
                    <hr className='page-break' />
                    <div className="form-group">
                        <label className='topic-text'>1. Name of the Company/Industry</label>
                        <p>{state.companyName}</p>
                        <p></p>
                    </div>
                    <label className='topic-text'>2. Location</label>
                    <div className="form-row">
                        <div className="form-group col-md">
                            <label >Province</label>
                            <p>{state.province}</p>
                        </div>
                        <div className="form-group col-md">
                            <label>District</label>
                            <p>{state.district}</p>
                        </div>
                        <div className="form-group col-md">
                            <label >DS Division</label>
                            <p>{state.dsDivision}</p>
                        </div>
                        <div className="form-group col-md">
                            <label>GN Division</label>
                            <p>{state.gnDivision}</p>
                        </div>
                        <div className="form-group col-md">
                            <label>Latitude</label>
                            <p>{state.latitude}</p>
                        </div>
                        <div className="form-group col-md">
                            <label >Longitude</label>
                            <p>{state.longitude}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='topic-text'>3. Address</label>
                        <p>{state.address}</p>
                    </div>

                    <label className='topic-text'>4. Contact Details</label>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label >Tele</label>
                            <p>{state.telenumber}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label >Email</label>
                            <p>{state.email}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Fax</label>
                            <p>{state.fax}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label >Website</label>
                            <p>{state.website}</p>
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
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                    <label className='topic-text'>6. What is the category that the organization belongs to?</label>

                    <div className='row radio-row'>
                        <div className='col-md mt-2 mb-2' >
                            <label>Annual Turnover in last 1-2 years</label>
                            <p>{state.turnover}</p>
                        </div>
                        <div className='col-md mt-2 mb-2' >
                            <label>Number of Employees</label>
                            <p>{state.employees}</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className='topic-text'>7. Year of Establishment</label>
                        <p>{state.yoe}</p>
                    </div>

                    <label className='topic-text'>8. Ownership and Registration of the Business</label>
                    <br />
                    <div>
                        <label className='mt-2 mb-2'>Type of Business Registration</label>
                        <p>{state.business_type + "-" + state.reg_no}</p>
                    </div>

                    <div>
                        <label className='mt-2 mb-2'>Industry Registration</label>
                        <p>{(state.industry_reg !== '') ? (state.industry_reg + "-" + state.industry_reg_no) : 'No'}</p>
                    </div>

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
                                <td><div className="form-group"><p>{state.land_area}</p></div></td>
                                <td><div className="form-group col"><p>{state.land_value}</p></div></td>
                            </tr>
                            <tr>
                                <td>Building</td>
                                <td><div className="form-group"><p>{state.building_area}</p></div></td>
                                <td><div className="form-group col"><p>{state.building_value}</p></div></td>
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
                                <td><p>{state.machine_value}</p></td>
                            </tr>
                            <tr>
                                <td>Utilities</td>
                                <td><p>{state.utilities_value}</p></td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td><p>{state.total_capital_investment}</p></td>
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
                                <td><p>{state.raw_mat_value}</p></td>
                            </tr>
                            <tr>
                                <td>Semi Finished Goods</td>
                                <td><p>{state.semi_goods_value}</p></td>
                            </tr>
                            <tr>
                                <td>Finished Goods</td>
                                <td><p>{state.goods_value}</p></td>
                            </tr>
                            <tr>
                                <td ><p className='bold'>Total</p></td>
                                <td><p>{state.total_working_capital}</p></td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        <label>9.3 Ownership of the Business</label>
                        <p>{state.site_type}</p>
                    </div>

                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>B. Operational and Technical Details of Business</label></div>
                    <hr className='page-break' />

                    <label className='topic-text'>1. What Metals Does the Industry Use and What is the Total Capacity (Kg) of the furnace?</label>

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
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                    <label className='topic-text'>2. Type of furnaces and Fuel Being Used</label>

                    <table className='table mt-4 table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th>furnace</th>
                                <th>Fuel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.furnaces.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.fuel}</td>
                                    </tr>)
                            })}
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
                                    </tr>)
                            })}
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
                                    </tr>)
                            })}
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
                                    </tr>)
                            })}
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
                                    </tr>)
                            })}
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
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                    <label className='topic-text mb-4 mt-2'>2. Market of the Products Being Sold (Local or Export)</label>

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

                    <label className='topic-text mb-2 mt-2'>3. Annual Turnover of the Industry</label>

                    <div className="form-row">
                        <div className="form-group col-md">
                            <label>2016/2017 (Rs. Mn)</label>
                            <p>{state.annual_turnover.y2016_2017}</p>
                        </div>
                        <div className="form-group col-md">
                            <label>2017/2018 (Rs. Mn)</label>
                            <p>{state.annual_turnover.y2017_2018}</p>
                        </div>
                        <div className="form-group col-md">
                            <label>2018/2019 (Rs. Mn)</label>
                            <p>{state.annual_turnover.y2018_2019}</p>
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
                                <td><p>{state.business_progression.year1_dir}</p></td>
                                <td><p>{state.business_progression.year1}</p></td>
                            </tr>
                            <tr>
                                <td>Year 2</td>
                                <td><p>{state.business_progression.year2_dir}</p></td>
                                <td><p>{state.business_progression.year2}</p></td>
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
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                    <hr className='page-break' />
                    <div className='main-con'><label className='main-text'>End of the Form</label></div>
                    <hr className='page-break' />

                    <div className='form-row'>
                        <div className="form-group col-md">
                            <label className='topic-text'>Name of the Interviewer</label>
                            <p>{state.interviewer}</p>
                        </div>

                        <div className="form-group col-md">
                            <label className='topic-text'>Year of the Interview</label>
                            <p>{state.yoi}</p>
                        </div>
                    </div>
                    <hr className='page-break' />
                </form>
            </div>
        </div>
    )
}

export default AllData;