import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Card, Form, Image, Row, Col, Spinner} from 'react-bootstrap';
import { ateam } from './ateam.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import ProductsTable from './ProductsTable';
import PaymentForm from './PaymentForm';


class PurchaseOrderPurchase extends React.Component {
    state = {
        products: []
    }
    render() {
        return (
            <Container className="mt center">
            <Card>
                <Row className="mt">
                    <Col xs={12} md={4}>
                        <Image src={"https://external-preview.redd.it/LddK4slWhSO6pNNkBs9_gYnnCnLIjAz3lIFOYR2Bzd4.jpg?auto=webp&s=9e8b51aa6fe8d153ad09f893e132ae5a37775729"}/>
                    </Col>
                    <Col xs={12} md={8}>
                        <h1>Create Purchase Order</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 4, offset:4}} sm={{span: 10, offset: 4}}>
                        <PaymentForm></PaymentForm>
                    </Col>

                </Row>
                <Form>
                </Form>
            </Card>
        </Container>
        )
    }

}



export default PurchaseOrderPurchase;