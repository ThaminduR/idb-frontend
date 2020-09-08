import React, { useState } from 'react'
import './App.css'
import 'font-awesome/css/font-awesome.min.css'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './services/AuthenticationService'

import PrivateRoute from './components/Routes/PrivateRoute'
import LoggedoutRoute from './components/Routes/LoggedoutRoute'
import Dashboard from './components/Dashboard/Dashboard'
import AllData from './components/AllData/AllData'
import Login from './components/Login/Login'
import NewSurvey from './components/NewSurvey/NewSurvey'
import ViewData from './components/ViewData/ViewData'
import DataAnalysis from './components/DataAnalysis/DataAnalysis'
import Page404 from './components/ErrorPage/Page404'
import ErrorPage from './components/ErrorPage/ErrorPage'
import FormView from './components/FormView/FormView'

import { API_BASE_URL } from './constants/constants'
import DeletedRecords from './components/DeletedRecords/DeletedRecords'



function App() {

  axios.defaults.withCredentials = true
  axios.defaults.baseURL = API_BASE_URL

  const existingtokens = JSON.parse(localStorage.getItem("token"));
  const [authTokens, setAuthTokens] = useState(existingtokens);

  const setTokens = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthTokens(data)
  }

  return (
    <div className="App">
      <div className=" d-flex align-items-center flex-column">
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <Router>
            <Switch>
              <LoggedoutRoute path='/Login' component={Login} />
              <PrivateRoute exact path='/Dashboard' component={Dashboard} />
              <PrivateRoute exact path='/AllRecords' component={AllData} />
              <PrivateRoute exact path='/DeletedRecords' component={DeletedRecords} />
              <PrivateRoute exact path='/NewSurvey' component={NewSurvey} />
              <PrivateRoute exact path='/ViewRecord' component={FormView} />
              <PrivateRoute exact path='/DataAnalysis' component={ViewData} />
              <Route exact path='/Error' component={ErrorPage} />
              <PrivateRoute exact path='/' component={DataAnalysis} />
              <Route component={Page404}></Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
