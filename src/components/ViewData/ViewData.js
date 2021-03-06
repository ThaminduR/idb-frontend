import React, { useState } from 'react'
import './ViewData.css'
import FurnaceCapcity from './FurnaceCapacity'
import MetalProduct from './MetalProduct'
import RawMaterial from './RawMaterial'
import AvgProduction from './AvgProduction'
import ExpectedProduction from './ExpectedProduction'
import MetalCategory from './MetalCategory'
import MachineryInvestment from './MachineryInvestment'
import TotalInvestment from './TotalInvestment'

function ViewData(props) {

    document.title = 'Data Analysis'

    const [state, setState] = useState({
        selected: 'Furnace Capacity'
    });

    const selectTab = (e) => {
        const { value } = e.target
        setState(prevState => ({
            selected: value
        }))
    }

    return (
        <div className='viewdata-background' >
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-2 tab-selector text-left'>

                        <nav id="sidebar" className="sidebar-wrapper">
                            <div className="sidebar-content">
                                <ul className="list-group list-group-flush mb-4">
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Furnace Capacity' onClick={selectTab}>Furnace Capacity</button></li>
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Production Data' onClick={selectTab}>Production Data</button></li>
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Raw Materials' onClick={selectTab}>Raw Materials</button></li>
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Average Production' onClick={selectTab}>Average Production</button></li>
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Expected Production' onClick={selectTab}>Expected Production</button></li>
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Metal Categories' onClick={selectTab}>Metal Categories</button></li>
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Machinery Investment' onClick={selectTab}>Machinery Investment</button></li>
                                    <li className="list-group-item"><button className='btn btn-outline-light' value='Total Investment' onClick={selectTab}>Total Investment</button></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className='col data-content'>
                        {
                            {
                                'Furnace Capacity': <FurnaceCapcity></FurnaceCapcity>,
                                'Production Data': <MetalProduct></MetalProduct>,
                                'Raw Materials': <RawMaterial></RawMaterial>,
                                'Average Production': <AvgProduction></AvgProduction>,
                                'Expected Production': <ExpectedProduction></ExpectedProduction>,
                                'Metal Categories': <MetalCategory></MetalCategory>,
                                'Machinery Investment':<MachineryInvestment></MachineryInvestment>,
                                'Total Investment': <TotalInvestment></TotalInvestment>,
                            }[state.selected]

                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewData;