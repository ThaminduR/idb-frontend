import React, { useState } from 'react';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import axios from 'axios'
import PrivateRoute from './components/Routes/PrivateRoute';
import { AuthContext } from './services/AuthenticationService';
import LoggedoutRoute from './components/Routes/LoggedoutRoute';
import 'font-awesome/css/font-awesome.min.css';
import Dashboard from './components/Dashboard/Dashboard';
import AllData from './components/AllData/AllData'
import Login from './components/Login/Login';
import NewSurvey from './components/NewSurvey/NewSurvey'
import ViewData from './components/ViewData/ViewData'
import { API_BASE_URL } from './constants/constants';
import Page404 from './components/ErrorPage/Page404';
import ErrorPage from './components/ErrorPage/ErrorPage';

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
              <LoggedoutRoute path='idb/login' component={Login} />
              <PrivateRoute exact path='idb/dashboard' component={AllData} />
              <PrivateRoute exact path='idb/newsurvey' component={NewSurvey} />
              <PrivateRoute exact path='idb/viewdata' component={ViewData} />
              <Route exact path='idb/error' component={ErrorPage} />
              <PrivateRoute exact path='idb/' component={Dashboard} />
              <Route component={Page404}></Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
