import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import axios from 'axios'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/Routes/PrivateRoute';
import { AuthContext } from './services/AuthenticationService';
import LoggedoutRoute from './components/Routes/LoggedoutRoute';
import 'font-awesome/css/font-awesome.min.css';
import { API_BASE_URL } from './constants/constants';

function App() {

  axios.defaults.withCredentials = true
  axios.defaults.baseURL = API_BASE_URL

  const existingtokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingtokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <div className="App">
      <div className=" d-flex align-items-center flex-column">
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <Router>
            <Switch>
              <LoggedoutRoute path='/login' component={Login} />
              <PrivateRoute path='/' component={Home} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
