import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import axiosClient from './config/axios';

//components
import Users from './Components/Users';
import Login from './Components/Login';

import './App.css';


function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosClient.get('/users')
        .then(res => {
          setUser(res.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
    fetchData();
  }, [] );

  return (
    <Router>
      <Switch>
        <Route 
          exact path = "/"
          component = {() => <Users user = {user}/>}
        />
        <Route 
          exact path = "/login"
          component = {Login}
        />
      </Switch>
    </Router>
  );
}

export default App;
