import React from 'react';
import { Container, Card, Form, Image, Row, Col, Spinner} from 'react-bootstrap';
import axios from 'axios';
import ProductsTable from './ProductsTable';
import { connect } from 'react-redux';
import productplaceholder from './productplaceholder.jpg'


class ViewProducts extends React.Component {
    state = {
        products: []
    }
    render() {
        return (
            <>
                <Container className="mt center">
                    <Card>
                        <Row>
                            <Col xs={12} md={4}>
                                <Image className="placeholder-img-lg" src={productplaceholder}/>
                            </Col>
                            <Col xs={12} md={8}>
                                <h1>Product Details</h1>
                                {this.productPrices()}
                            </Col>
                        </Row>
                        <Form>
                        </Form>
                    </Card>
                </Container>
            </>
        )
    }

    productPrices() {
        if(this.state.error) {
            return <h5> Failed to load products </h5>
        }
        if(this.state.products[0]) {
            return(
                <>
                    <ProductsTable products={this.state.products}></ProductsTable>
                </>
            )
        }
        return (
        <>
            <Spinner animation="border" role="status"></Spinner>
            <h5> Loading Product, please wait...</h5>
        </>
        );
    }

    componentDidMount() {
        console.log(process.env);
        var ean = this.props.match.params.ean;
        axios.get(`${process.env.REACT_APP_PURCHASEORDERS_URL}/api/products/getProductsByEan?ean=${ean}`).then(resp =>  {
            this.setState({
                products: resp.data
            });            
        }).catch(err => {
            console.log(err);
            this.setState({
                error: true
            });
            
        })
    }
    

}



export default connect()(ViewProducts);