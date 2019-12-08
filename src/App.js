import React from 'react';
import logo from './logo.svg';
import './App.css';
import TeamANavBar from './Components/TeamANavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AccountTable from './Components/AccountTable';
import UserProfile from './Components/UserProfile';
import EditUserProfile from './Components/EditUserProfile';
import CreatePurchaseOrder from './Components/CreatePurchaseOrder';
import MockProducts from './Components/MockProducts';

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
    <Route
      exact
      path='/users/:id'
      component={UserProfile}/>
    <Route
      exact
      path='/users/edit/:id'
      component={EditUserProfile}/>
    <Route
      exact
      path='/products/'
      component={MockProducts}/>
    <Route
      exact
      path='/purchaseorders/create/:id'
      component={CreatePurchaseOrder}/>
    </Router>

  );
}

export default App;
