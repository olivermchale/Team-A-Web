import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Container, Card, Image, Badge, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import user from './user.png'
import { useParams, Redirect } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';

class OrderDetails extends React.Component {
    state = {
        user: {

        },
        navigateToEdit: false
    }
    render() {
        if (!this.state.user.id) {
            return <div />
        }
        if (this.state.navigateToEdit) {
            return <Redirect to={`/users/edit/${this.state.user.id}`}></Redirect>
        }
        return (
            <>
                <Container className="mt center">
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={{span: 4, offset: 4}} xs={{span: 4, offset: 4}}>
                                    <Card.Title>
                                        {this.state.user.firstName + ' ' + this.state.user.lastName}
                                    </Card.Title>
                                </Col>
                                <Col md={4} xs = {4}>
                                    <Button onClick={this.navigateToEdit} className="float-right teamA-btn" variant="warning">
                                            Edit
                                    </Button>
                                </Col>
                            </Row>
                            {this.getLastDate()}
                            <Image src={user} className="user-image"/>
                            <br/>
                            <label>Address&nbsp;</label>
                            {this.state.user.address}
                            <br/>
                            <label>Postcode&nbsp;</label>
                            {this.state.user.postcode}
                            <br/>
                            <label>Email&nbsp;</label>
                            {this.state.user.email}
                            <br/>
                            <label>Phone Number&nbsp;</label>
                            {this.state.user.phoneNumber}
                            <br/>
                            {this.state.user.canPurchase ? <Badge variant="success">Can Purchase</Badge> : <Badge variant="danger">Purchase Disabled</Badge>}
                            {this.state.user.isDeleteRequested? 
                                <Badge variant="danger ml">Delete Requested</Badge> 
                            : 
                                <React.Fragment><br/> <Button onClick={this.requestDelete} size = "sm" className="mt-sm" variant="danger">Request Delete</Button></React.Fragment>}
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

    navigateToEdit = () => {
        this.setState({
            navigateToEdit: true
        })
    }

    requestDelete = ($event) => {
        axios.put(`https://localhost:44375/api/accounts/requestAccountDelete?accountId=${this.state.user.id}`, {
            accountId: this.state.user.id
        }).then(resp => {
            var updatedUser = this.state.user
            updatedUser.isDeleteRequested = true
            this.setState({
                user: updatedUser
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getLastDate = () => {
        var date = new Date(this.state.user.loggedOnAt)
        return <p className="opaque">Last logged on at {date.toDateString()}</p>
    }

    test() {
        console.log(this.state.user);
    }

    getQueryParams(path) {
        return path.substr(path.length - 36)
    } 

}



export default OrderDetails;