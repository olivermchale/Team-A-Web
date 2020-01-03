import React, { Component } from 'react';
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
import Cookies from 'universal-cookie';
import oauth from 'axios-oauth-client';
import axios from 'axios';
import {
  authUrl,
  username,
  password,
  clientID,
  clientSecret,
  clientScope
} from './Components/Constants';

class App extends React.Component {

  constructor(props){
    super(props);
    this.token = (new Cookies()).get("AccessToken");
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  render() {
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

  componentWillMount() {
    const getToken = oauth.client(axios.create(), {
      url: authUrl,
      grant_type: 'password',
      client_id: clientID,
      client_secret: clientSecret,
      username: username,
      password: password,
      scope: clientScope
    });

    getToken().then(resp => {
      document.cookie = `AccessToken=${resp.access_token}`;
      axios.defaults.headers.common['Authorization'] = "Bearer " + (new Cookies()).get("AccessToken");
    })

  }

}

export default App;
