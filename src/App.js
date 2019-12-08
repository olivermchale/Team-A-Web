import React from 'react';
import logo from './logo.svg';
import './App.css';
import TeamANavBar from './Components/TeamANavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AccountTable from './Components/AccountTable';
import UserProfile from './Components/UserProfile';
import EditUserProfile from './Components/EditUserProfile';
import ViewProducts from './Components/ViewProducts';
import MockProducts from './Components/MockProducts';
import PurchaseOrderPurchase from './Components/PurchaseOrderPurchase';

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
      path='/purchaseorders/products/:id'
      component={ViewProducts}/>
    <Route
      exact
      path='/purchaseorders/products/purchase/:id'
      component={PurchaseOrderPurchase}/>
    </Router>

  );
}

export default App;
