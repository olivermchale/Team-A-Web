import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TeamANavBar from './Components/TeamANavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AccountTable from './Components/AccountTable';
import UserProfile from './Components/UserProfile';
import EditUserProfile from './Components/EditUserProfile';
import ViewProducts from './Components/ViewProducts';
import AvailableProductTable from './Components/AvailableProductTable';
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
import jwt from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class App extends React.Component {

  state = {
    unauthorized: false
  }


  constructor(props) {
    super(props);
    this.token = (new Cookies()).get("AccessToken");
    axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

    axios.interceptors.response.use(response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
      }, error => {
        if(error.response.status == 401) {
          // if user is unauthorized, lets prompt them to log in
          this.setState({
            unauthorized: true
          });
        }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

  }

  render() {
    return (
      <>
      <Dialog open={this.state.unauthorized} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Authorize</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To use this page, you must be an authroized user. If you have an account, please log in.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            onChange={this.handleEmailChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={this.handlePasswordChange}
          />
          {this.errorText()}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleLogin} color="primary">
            Log In
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
          component={AvailableProductTable}/>
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
      </>
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
      // axios.defaults.headers.common['Authorization'] = "Bearer " + (new Cookies()).get("AccessToken");
      let tokenInfo = jwt(resp.access_token);
      // use this token info to get who the current user is
      localStorage.setItem("currentUserId", tokenInfo.sub);
    })
  }

  errorText = () => {
    if(this.state.invalid) {
      return (
        <DialogContentText className="error-text">
          Invalid email or password.
        </DialogContentText>
      );
    }
  }

  handleClose = () => {
    this.setState({
      unauthorized: false
    })
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleLogin = () => {
    const getToken = oauth.client(axios.create(), {
      url: authUrl,
      grant_type: 'password',
      client_id: clientID,
      client_secret: clientSecret,
      username: this.state.email,
      password: this.state.password,
      scope: clientScope
    });

    getToken().then(resp => {
      this.setState({
        invalid: false,
        unauthorized: false
      });
      document.cookie = `AccessToken=${resp.access_token}`;
      // axios.defaults.headers.common['Authorization'] = "Bearer " + (new Cookies()).get("AccessToken");
      let tokenInfo = jwt(resp.access_token);
      // use this token info to get who the current user is
      localStorage.setItem("currentUserId", tokenInfo.sub);
      window.location.reload();
    }, err => {
      this.setState({
        invalid: true
      });
    })
  }


}

export default App;
