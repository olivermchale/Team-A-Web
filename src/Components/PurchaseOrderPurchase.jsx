import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Card, Form, Image, Row, Col, Spinner} from 'react-bootstrap';
import { ateam } from './ateam.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import ProductsTable from './ProductsTable';
import PaymentForm from './PaymentForm';
import { connect } from 'react-redux';


class PurchaseOrderPurchase extends React.Component {
    state = {
        products: [],
        quantity: 1,
        address: '',
        name: '',
        postcode:  ''
    }
    render() {
        return (
            <Container className="mt center">
            <Card>
                <Row className="mt">
                    <Col xs={12} md={4}>
                        <Image className="placeholder-img" src={"https://external-preview.redd.it/LddK4slWhSO6pNNkBs9_gYnnCnLIjAz3lIFOYR2Bzd4.jpg?auto=webp&s=9e8b51aa6fe8d153ad09f893e132ae5a37775729"}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <h1>{this.props.name}</h1>
                    </Col>
                </Row>
                <Form.Group as={Row}>
                    <Col xs={9} md={{span: 4, offset: 4}}>
                        <Form.Control 
                            name="quantity" 
                            onChange={this.handleInputChange} 
                            placeholder="Quantity" />
                    </Col>
                </Form.Group>
                <Row className="mt-15">
                    <Col xs={12} md={{span: 4, offset: 4}}>
                        <p>Price: {'£'+(this.props.price * this.state.quantity).toFixed(2)}</p>
                    </Col>
                    <Col xs={12} md={12}>
                        <hr/>
                    </Col>
                </Row>
                <Row className="mt-15">
                    <Col className="mt-15" md={{span: 4, offset:4}} xs = {12}>
                        <Form.Control 
                            name="address" 
                            type="text"
                            onChange={this.handleInputChange} 
                            placeholder="Address" />
                    </Col>
                    <Col className="mt-15" md={{span: 4, offset:4}} xs = {12}>
                        <Form.Control 
                            name="postcode" 
                            type="text"
                            onChange={this.handleInputChange} 
                            placeholder="Postcode" />
                    </Col>
                    <Col className="mt-15 mb" md={{span: 4, offset:4}} xs = {12}>
                        <Form.Control 
                            name="name" 
                            type="text"
                            onChange={this.handleInputChange} 
                            placeholder="Name" />
                    </Col>
                    <Col xs={12} md={12}>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 4, offset:4}} sm={{span: 10, offset: 2}}>
                        <PaymentForm></PaymentForm>
                    </Col>
                </Row>
            </Card>
            <button onClick={this.clicked}>btn</button>
        </Container>
        );
    }

    clicked = () => {
        console.log(this.state); 
        console.log(this.props); //props holds our redux data now :)
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

}

const mapStateToProps = (state) => ({
    name: state.name,
    price: state.price,
    id: state.id
})


export default connect(mapStateToProps)(PurchaseOrderPurchase);