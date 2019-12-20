import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Card, Form, Image, Row, Col, Spinner } from 'react-bootstrap';
import { ateam } from './ateam.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import ProductsTable from './ProductsTable';
import PaymentForm from './PaymentForm';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import productplaceholder from './productplaceholder.jpg'
import SweetAlert from 'sweetalert2-react';
import { useHistory, Redirect } from 'react-router-dom';
import 'sweetalert/dist/sweetalert.css';

class PurchaseOrderPurchase extends React.Component {
    state = {
        products: [],
        quantity: 1,
        address: '',
        name: '',
        postcode: '',
        cardName: '',
        cardExpiry: '',
        cardCvc: '',
        cardNumber: '',
        source: '',
        user: {},
        loading: false,
        purchased: false,
        navigate: false,
        error: false
    }
    render() {
        if (this.state.navigate) {
            return <Redirect to={`/products`}></Redirect>
        }
        if (!this.state.user.id) {
            return (
                <Container className="mt center">
                    <Card>
                        <Spinner className="spin-center" animation="border" role="status"></Spinner>
                        <h5> Loading, please wait... </h5>
                    </Card>
                </Container>
            )
        }

        return (
            <>
                <SweetAlert
                show={this.state.purchased}
                title="Purchase Successful!"
                text="Continue Shopping"
                onConfirm={() => {
                    this.removeSwal(true)
                }}
                />
                <SweetAlert
                show={this.state.error}
                title="Purchase Failed!"
                text="Retry?"
                onConfirm={() => {
                    this.removeSwal(false)
                }}
                />
            <LoadingOverlay
                active={this.state.loading}
                spinner
                text='Creating Purchase Order...'>
                <Container className="mt center">
                    <Card>
                        <Row className="mt">
                            <Col xs={12} md={4}>
                                <Image className="placeholder-img" src={productplaceholder} />
                            </Col>
                            <Col xs={12} md={4}>
                                <h1>{this.props.name}</h1>
                            </Col>
                        </Row>
                        <Form.Group as={Row}>
                            <Col xs={9} md={{ span: 4, offset: 4 }}>
                                <Form.Control
                                    name="quantity"
                                    onChange={this.handleInputChange}
                                    placeholder="Quantity" />
                            </Col>
                        </Form.Group>
                        <Row className="mt-15">
                            <Col xs={12} md={{ span: 4, offset: 4 }}>
                                <p>Price: {'£' + (this.props.price * this.state.quantity).toFixed(2)}</p>
                            </Col>
                            <Col xs={12} md={12}>
                                <hr />
                            </Col>
                        </Row>
                        <Row className="mt-15">
                            <Col className="mt-15" md={{ span: 4, offset: 4 }} xs={12}>
                                <Form.Control
                                    name="address"
                                    type="text"
                                    onChange={this.handleInputChange}
                                    defaultValue={this.state.user.address}
                                    placeholder="Address" />
                            </Col>
                            <Col className="mt-15" md={{ span: 4, offset: 4 }} xs={12}>
                                <Form.Control
                                    name="postcode"
                                    type="text"
                                    onChange={this.handleInputChange}
                                    defaultValue={this.state.user.postcode}
                                    placeholder="Postcode" />
                            </Col>
                            <Col className="mt-15 mb" md={{ span: 4, offset: 4 }} xs={12}>
                                <Form.Control
                                    name="name"
                                    type="text"
                                    onChange={this.handleInputChange}
                                    defaultValue={(this.state.user.firstName + ' ' + this.state.user.lastName)}
                                    placeholder="Name" />
                            </Col>
                            <Col xs={12} md={12}>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 4, offset: 4 }} sm={{ span: 10, offset: 2 }}>
                                <PaymentForm callback={this.orderHandler}></PaymentForm>
                            </Col>
                        </Row>
                    </Card>

                </Container>
            </LoadingOverlay>
            </>
        );
    }

    componentWillMount() {
        var userId = localStorage.getItem('currentUserId');
        if (userId != null) {
            axios.get(`https://localhost:44375/api/accounts/getcustomer?accountId=${userId}`).then(resp => {
                this.setState({
                    user: resp.data
                })
            });
        }
    }

    removeSwal = (success) => {
        if(success) {
            this.setState({ 
                navigate: true, purchased: false, loading: false 
            })
        } else {
            this.setState({
                error: false
            })
        }

    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    orderHandler = (orderInfo) => {
        this.state.cardCvc = orderInfo.cvc;
        this.state.cardNumber = orderInfo.number;
        this.state.cardName = orderInfo.name;
        this.state.cardExpiry = orderInfo.expiry;
        this.state.productPrice = this.props.price;
        this.state.productId = this.props.id;
        this.state.productName = this.props.name;
        this.state.productSource = this.props.source;
        this.state.externalId = this.props.externalId;
        this.createOrder();
    }

    createOrder = () => {
        this.setState({ loading: true })
        axios.post('https://localhost:44396/api/orders/createOrder', {
            purchasedBy: this.state.user.id,
            productId: this.state.productId,
            purchasedOn: new Date(),
            productName: this.state.productName,
            quantity: this.state.quantity,
            externalId: this.state.externalId,
            productPrice: this.state.productPrice,
            address: this.state.user.address,
            postcode: this.state.user.postcode,
            source: this.state.productSource,
            paymentInformation: {
                cardName: this.state.cardName,
                cardNumber: this.state.cardNumber,
                cardExpiry: this.state.cardExpiry,
                cardCvc: this.state.cardCvc,
            },
            purchaseStatus: {
                name: 'Ordered'
            }
        }).then(resp => {
            this.setState({
                loading: false,
                purchased: true
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false,
                error: true
            })
        })
    }

}

const mapStateToProps = (state) => ({
    name: state.name,
    price: state.price,
    source: state.source,
    id: state.id,
    externalId: state.externalId,
})


export default connect(mapStateToProps)(PurchaseOrderPurchase);