import React from 'react';
import logo from './logo.svg';
import './App.css';
import TeamANavBar from './Components/TeamANavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AccountTable from './Components/AccountTable';

function App() {
  return (
    <Router>
    <React.Fragment>
      <TeamANavBar/>
    </React.Fragment>
    <Route 
      exact 
      path='/users'
      component={AccountTable}/>
    </Router>

  );
}

export default App;
