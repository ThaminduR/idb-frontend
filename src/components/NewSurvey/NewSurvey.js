import React, { useState } from 'react'
import './NewSurvey.css'
function NewSurvey(props) {

    const [state, setState] = useState({
        statechange: '',
        errorMessage: null,
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
        proprietor: [{ name: "Test1", designation: "Lol", tele: "09", mobile: "07", email: "sd" }],
        pname: '', pdesignation: '', ptele: '', pmobile: '', pemail: '',
        yoe: '',

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

    const closeError = (e) => {
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

                    <table className="table table-striped table-bordered">
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

                    <table className="table table-striped table-bordered">
                        <thead className='thead-light'>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Category</th>
                                <th scope="col">Annual Turnover <br /> in last 1-2 years</th>
                                <th scope="col">Response</th>
                                <th scope="col">Number of Employees</th>
                                <th scope="col">Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A</td>
                                <td>Micro</td>
                                <td>0-15</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="macro_turn" name='turnover' value="option1" /></div></td>
                                <td>0-10</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="macro_emp" name='employess' value="option1" /></div></td>
                            </tr>
                            <tr>
                                <td>B</td>
                                <td>Small</td>
                                <td>16-250</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="small_turn" name='turnover' value="option2" /></div></td>
                                <td>11-50</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="small_emp" name='employess' value="option2" /></div></td>
                            </tr>
                            <tr>
                                <td>C</td>
                                <td>Medium</td>
                                <td>251-750</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="medium_turn" name='turnover' value="option3" /></div></td>
                                <td>51-300</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="medium_emp" name='employess' value="option3" /></div></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="form-group">
                        <label className='topic-text'>7. Year of Establishment</label>
                        <input type="text" className="form-control" id="yoe" value={state.yoe} onChange={handleChange} />
                    </div>

                    <label className='topic-text'>8. Ownership and Registration of the Business</label>
                    <br />
                    <label className='mt-2 mb-2'>Type of Business Registration</label>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <td>Sole Proprietor</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="sole_business" name='business_type' value="option1" /></div></td>
                            </tr>
                            <tr>
                                <td>Partnership</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="part_business" name='business_type' value="option2" /></div></td>
                            </tr>
                            <tr>
                                <td>Limited Liability</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="limited_business" name='business_type' value="option3" /></div></td>

                            </tr>
                            <tr>
                                <td>Cooperative</td>
                                <td><div class="form-check"><input class="form-check-input" type="radio" id="coop_business" name='business_type' value="option4" /></div></td>
                            </tr>
                            <tr>
                                <td>Registration No.</td>
                                <td><input type="text" className="form-control" id="reg_no" /></td>
                            </tr>
                        </tbody>
                    </table>

                    <label className='mt-2 mb-2'>Industry Registration</label>
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <td>Whether obatain Registration <br />under Ministry of Industries</td>
                                <td><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="industry_reg" value="option1" /></div></td>
                            </tr>
                            <tr>
                                <td>Registration No.</td>
                                <td><input type="text" className="form-control" id="reg_no" /></td>
                            </tr>
                        </tbody>
                    </table>




                </form>
            </div>
        </div >
    )
}

export default NewSurvey;