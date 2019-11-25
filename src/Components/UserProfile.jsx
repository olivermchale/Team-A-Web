import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

class UserProfile extends React.Component {
    state = {
    }
    render() {
        return (
            <>
                <h1>hi</h1>
            </>
        )
    }

    componentDidMount() {
        var id = this.getQueryParams(this.props.location.pathname);
        axios.get(`https://localhost:44375/api/accounts/getcustomer?accountId=${id}`).then(resp =>  {
            this.setState({
                user: resp.data
            });
            this.test();
        })
    }

    test() {
        console.log(this.state.user);
    }

    getQueryParams(path) {
        return path.substr(path.length - 36)
    } 

}



export default UserProfile;