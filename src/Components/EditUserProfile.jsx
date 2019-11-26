import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Container, Card, Image, Badge, Button, Form, Col, Row } from 'react-bootstrap';
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
        if (!this.state.user.id) {
            return <div />
        }
        return (
            <>
                <Container className="mt center">
                <Card>
                <Form>
                    <Card.Body>
                        <Card.Title>
                        
                            <Form.Group as={Row} controlId="formName">
                                <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Name
                                </Form.Label>
                                <Col xs={9} md={4}>
                                <Form.Control  defaultValue="Oliver McHale" />
                                </Col>
                            </Form.Group>
                        </Card.Title>
                        {this.getLastDate()}
                        <Image src={user} className="user-image"/>
                        <Form.Group as={Row} controlId="formAddress">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Address
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control defaultValue="Teesside"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPostcode">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Postcode
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control defaultValue="Teesside"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formEmail">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Email
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control defaultValue="Teesside"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPhoneNum">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Phone Number
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control defaultValue="Teesside"/>
                            </Col>
                        </Form.Group>
                    </Card.Body>
                    </Form>
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



export default UserProfile;
