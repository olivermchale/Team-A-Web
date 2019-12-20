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
import OrdersTable from './Components/OrdersTable';
import OrderDetails from './Components/OrderDetails';

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
      path='/purchaseorders/products/:ean'
      component={ViewProducts}/>
    <Route
      exact
      path='/purchaseorders/products/purchase/:id'
      component={PurchaseOrderPurchase}/>
    <Route
      exact
      path='/purchaseorders/'
      component={OrdersTable}/>
    <Route
      exact
      path='/purchaseorders/:id'
      component={OrderDetails}/>
    </Router>
  );
}

export default App;
