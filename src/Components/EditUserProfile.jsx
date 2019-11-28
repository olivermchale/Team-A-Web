import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Container, Card, Image, Badge, Button, Form, Col, Row, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import user from './user.png'
import { useParams } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { useHistory, Redirect } from 'react-router-dom'

class EditUserProfile extends React.Component {
    state = {
        user: {

        },
        userUpdated: false
    }
    history;
    render() {
        if (!this.state.user.id) {
            return <div />
        }
        if (this.state.userUpdated) {
            return <Redirect to={`/users/${this.state.user.id}`}></Redirect>
        }
        return (
            <>
                <Container className="mt center">
                <Card>
                <Form>
                    <Card.Body>
                        <Card.Title>
                        
                            <Form.Group as={Row} controlId="firstName">
                                <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                First Name
                                </Form.Label>
                                <Col xs={9} md={4}>
                                <Form.Control onChange={this.handleFormChange} defaultValue={this.state.user.firstName} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="lastName">
                                <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Second Name
                                </Form.Label>
                                <Col xs={9} md={4}>
                                <Form.Control onChange={this.handleFormChange} defaultValue={this.state.user.lastName} />
                                </Col>
                            </Form.Group>
                        </Card.Title>
                        {this.getLastDate()}
                        <Image src={user} className="user-image"/>
                        <Form.Group  as={Row} controlId="address">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Address 
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control onChange={this.handleFormChange} defaultValue={this.state.user.address}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="postcode">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Postcode
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control onChange={this.handleFormChange} defaultValue={this.state.user.postcode}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Email
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control onChange={this.handleFormChange} defaultValue={this.state.user.email}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="phoneNum">
                            <Form.Label  className="text-right teamA-form-lbl" column xs={3} md={4}>
                                Phone Number
                            </Form.Label>
                            <Col xs={9} md={4}>
                                <Form.Control onChange={this.handleFormChange} defaultValue={this.state.user.phoneNumber}/>
                            </Col>
                        </Form.Group>
                    </Card.Body>
                    </Form>
                    <Row >
                        <Col className="text-center mb">
                            <Button variant="success" className="mr" onClick={this.updateUser}>Save</Button>
                            <Button variant="secondary" className="ml" onClick={this.cancelUpdate}>Cancel</Button>
                        </Col>
                    </Row>
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
        })
    }

    updateUser = () => {
        console.log(this.state.user);
        axios.put('https://localhost:44375/api/accounts/updateUser', {
            id: this.state.user.id,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            address: this.state.user.address,
            postcode: this.state.user.postcode,
            email: this.state.user.email,
            phoneNumber: this.state.user.phoneNumber
        }).then(resp => {
            this.setState({
                userUpdated: true
            });
        }).catch(err => {
            console.log(err);
        })

        //todo: implement backend update user
        
    }

    cancelUpdate = () => {
        this.props.history.goBack();
    }

    handleFormChange = (e) => {
        var user = this.state.user;
        user[e.target.id] = e.target.value;
        this.setState({user});
    }

    getLastDate = () => {
        var date = new Date(this.state.user.loggedOnAt)
        return <p className="opaque">Last logged on at {date.toDateString()}</p>
    }

    getQueryParams(path) {
        return path.substr(path.length - 36)
    } 

    

}



export default EditUserProfile;
