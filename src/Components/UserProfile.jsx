import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Container, Card, Image } from 'react-bootstrap';
import axios from 'axios';
import user from './user.png'
import { useParams } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

class UserProfile extends React.Component {
    state = {
        user: {

        }
    }
    render() {
        return (
            <>
                <Container className="mt center">
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {this.state.user.firstName + ' ' + this.state.user.lastName}
                                <br/>
                                <Image src={user} className="mt user-image"/>
                            </Card.Title>
                            {this.state.user.address}
                            <br/>
                            {this.state.user.postcode}
                            <br/>
                            {this.state.user.email}
                            <br/>
                            {this.state.user.phoneNumber}
                            <br/>
                            {this.getActivity()}
                        </Card.Body>
                    </Card>
                </Container>
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

    getActivity = () => {
        var x = new Date(this.state.user.loggedOnAt)
        return <p>Last logged on at {x}</p>
    }

    test() {
        console.log(this.state.user);
    }

    getQueryParams(path) {
        return path.substr(path.length - 36)
    } 

}



export default UserProfile;