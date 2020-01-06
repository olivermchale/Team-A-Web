import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';

function idFormatter (cell, row)  {
    return (
        <Link to = {`purchaseorders/${row.id}`}>
            <span>{cell}</span>
        </Link>
    )
}

function priceFormatter (cell, row) {
    if(row.price) {
        return '£' +row.price.toFixed(2);
    }
}



class OrdersTable extends React.Component {
    state = {
        orders: [],
        columns : [
            {
                dataField: 'productName',
                text: 'Product Name',
                formatter: idFormatter
            },
            {
                dataField: 'orderStatus',
                text: 'Order Status'
            },
            {
                dataField: 'price',
                text: 'Price',
                formatter: priceFormatter
            },
            {
                dataField: 'quantity',
                text: 'Quantity'
            }
        ]
    }



    render() {
        if(this.state.error) {
            return (
                <Container className="mt center">
                    <h5> Failed to load orders </h5>
                </Container>
                )
        }
        if(!this.state.orders[0])
        {
            return (
            <Container className="mt center">
                <Spinner animation="border" role="status"></Spinner>
                <h5> Loading Orders, please wait... </h5>
            </Container>
            )
        }
        return (
            <Container style={{ marginTop: 50 }}>
                <Card>
                    <BootstrapTable 
                    striped
                    bootstrap4
                    hover
                    keyField='id' 
                    data={ this.state.orders } 
                    columns={ this.state.columns } 
                    pagination={ paginationFactory()}/>
                </Card>
            </Container>
        )
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_PURCHASEORDERS_URL}/api/orders/getorders`).then(resp =>  {
            this.setState({
                orders: resp.data.orders
            });
        }).catch(err => {
            console.log(err);
            this.setState({ 
                error: true
            })
        })
    }
}



export default OrdersTable;