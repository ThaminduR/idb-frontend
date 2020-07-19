import React, { useState } from 'react'
import './NewSurvey.css'
function NewSurvey(props) {

    const [state, setState] = useState({
        statechange: '', //Temperary variables
        errorMessage: null,  //Temperary variables
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
        pname: '', pdesignation: '', ptele: '', pmobile: '', pemail: '', //Temperary variables
        turnover: '',
        employees: '',
        yoe: '',
        business_type: '', reg_no: '',
        industry_reg: false, industry_reg_no: '',


    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handlePropRowSubmit = (e) => {
        e.preventDefault()
        if (state.pname.length && state.pdesignation && state.ptele && state.pmobile && state.pemail) {
            const propr = {
                name: state.pname,
                designation: state.pdesignation,
                tele: state.ptele,
                mobile: state.pmobile,
                email: state.pemail
            }
            state.proprietor.push(propr)
            setState(prevState => ({
                ...prevState,
                errorMessage: '',
            }))
        } else {
            setState(prevState => ({
                ...prevState,
                errorMessage: 'Incomplete Data Row'
            }))
        }
    }

    const handlePropRowDelete = (key, e) => {
        e.preventDefault()
        state.proprietor.splice(key, 1)

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

    const handleCheckboxChange = (e) => {
        const {id} = e.target
        const value = state[id]
        setState(prevState => ({
            ...prevState,
            [id]: !value
        }))
    }

    const test = (e) => {
        e.preventDefault()
        console.log(state.industry_reg_no)
    }

    const closeError = (e) => {
        e.preventDefault()
        setState(prevState => ({
            ...prevState,
            errorMessage: '',
        }))
    }

    return (
        <div className='newsurvey-background'>
            <div className="alert alert-danger" style={{ display: state.errorMessage ? 'block' : 'none' }} role="alert">
                {state.errorMessage}
                <button type="button" className="close ml-1" aria-label="Close" onClick={(e) => closeError(e)} ><span aria-hidden="true">&times;</span></button>
            </div>
            <button className='test' onClick={test}>Test</button>
            <div className='container form-card'>
                <form>
                    <div className="form-group">
                        <label className='topic-text'>1. Name of the Company/Industry</label>
                        <input type="text" className="form-control" id="companyName" value={state.companyName} onChange={handleChange} />
                    </div>
                    <label className='topic-text'>2. Location</label>
                    <div className="form-row">
                        <div className="form-group col-md">
                            <label >Province</label>
                            <input type="text" className="form-control" id="province" value={state.province} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md">
                            <label>District</label>
                            <input type="text" className="form-control" id="district" value={state.district} onChange={handleChange} />
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
                            {state.proprietor.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.tele}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td>

                                        <td><button type="button" className="close" aria-label="Close" onClick={(e) => handlePropRowDelete(i, e)} ><span aria-hidden="true">&times;</span></button></td>
                                    </tr>)
                            })}
                            <tr>
                                <td><input type="text" className="form-control" id="pname" value={state.pname} onChange={handleChange} /></td>
                                <td><input type="text" className="form-control" id="pdesignation" value={state.pdesignation} onChange={handleChange} /></td>
                                <td><input type="text" className="form-control" id="ptele" value={state.ptele} onChange={handleChange} /></td>
                                <td><input type="text" className="form-control" id="pmobile" value={state.pmobile} onChange={handleChange} /></td>
                                <td><input type="text" className="form-control" id="pemail" value={state.pemail} onChange={handleChange} /></td>
                                <td><button className='btn btn-outline-dark' onClick={(e) => handlePropRowSubmit(e)}>Add</button></td>
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
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="macro_turn" name='turnover' value="macro" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="small_turn" name='turnover' value="small" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Medium</td>
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
                                        <td>Macro</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="macro_emp" name='employees' value="macro" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Small</td>
                                        <td><div className="form-check"><input className="form-check-input" type="radio" id="small_emp" name='employees' value="small" /></div></td>
                                    </tr>
                                    <tr>
                                        <td>Medium</td>
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




                </form>
            </div>
        </div >
    )
}

export default NewSurvey;