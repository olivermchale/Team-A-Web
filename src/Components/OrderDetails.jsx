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
        order: {

        },
    }
    render() {
        if (!this.state.order.id) {
            return <div />
        }
        return (
            <>
                <Container className="mt center">
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={{span: 4, offset: 4}} xs={{span: 4, offset: 4}}>
                                    <Card.Title>
                                        Order Details
                                    </Card.Title>
                                </Col>
                                <Col md={4} xs = {4}>
                                    <Button onClick={this.navigateToEdit} className="float-right teamA-btn" variant="warning">
                                            Edit
                                    </Button>
                                </Col>
                            </Row>
                            {this.getOrderDate()}
                            <Image src={user} className="user-image"/>
                            <br/>
                            <label>Product Name&nbsp;</label>
                            {this.state.order.productName}
                            <br/>
                            <label>Quantity&nbsp;</label>
                            {this.state.order.quantity}
                            <br/>
                            <label>Price&nbsp;</label>
                            {this.state.order.productPrice}
                            <br/>
                            <label>Address&nbsp;</label>
                            {this.state.order.address}
                            <br/>
                            <label>Postcode&nbsp;</label>
                            {this.state.order.postcode}
                            <br/>
                            <label>Source&nbsp;</label>
                            {this.state.order.source}
                            <br/>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        )
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        axios.get(`https://localhost:44396/api/orders/getorder?id=${id}`).then(resp =>  {
            this.setState({
                order: resp.data
            });
            this.test();
        })
    }

    getOrderDate = () => {
        var date = new Date(this.state.order.purchasedOn)
        return <p className="opaque">Purchased at {date.toDateString()}</p>
    }

    test() {
        console.log(this.state.user);
    }

    getQueryParams(path) {
        return path.substr(path.length - 36)
    } 

}



export default OrderDetails;