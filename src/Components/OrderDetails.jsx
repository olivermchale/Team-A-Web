import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Container, Card, Image, Badge, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import productplaceholder from './productplaceholder.jpg'
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
                            <Image src={productplaceholder} rounded className="user-image"/>
                            <br/>
                            <label>Product Name&nbsp;</label>
                            {this.state.order.productName}
                            <br/>
                            <label>Quantity&nbsp;</label>
                            {this.state.order.quantity}
                            <br/>
                            <label>Total Price&nbsp;</label>
                            £{this.state.order.orderPrice.toFixed(2)}
                            <br/>
                            <label>Source&nbsp;</label>
                            {this.state.order.source}
                            <br/>
                            <label>Order Status&nbsp;</label>
                            {this.state.order.purchaseStatus}
                            <br/>
                            <hr/>
                            <h3>Delivery Information</h3>
                            <label>Address&nbsp;</label>
                            {this.state.order.address}
                            <br/>
                            <label>Postcode&nbsp;</label>
                            {this.state.order.postcode}
                            <br/>
                            <hr/>
                            <h3>Payment Information</h3>
                            <label>Name on card&nbsp;</label>
                            {this.state.order.cardholderName}
                            <br/>
                            <label>Last four digits&nbsp;</label>
                            {this.state.order.last4Digits}
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
        return <p className="opaque">Purchased on {date.toDateString()}</p>
    }

    test() {
        console.log(this.state.user);
    }

    getQueryParams(path) {
        return path.substr(path.length - 36)
    } 

}



export default OrderDetails;