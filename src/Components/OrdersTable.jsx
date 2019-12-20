import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function idFormatter (cell, row)  {
    return (
        <Link to = {`purchaseorders/${row.id}`}>
            <span>{cell}</span>
        </Link>
    )
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
                text: 'Price'
            },
            {
                dataField: 'quantity',
                text: 'Quantity'
            }
        ]
    }
    render() {
        return (
            <>
                <Container style={{ marginTop: 50 }}>
                    <Card>
                        <BootstrapTable 
                        striped
                        bootstrap4
                        hover
                        keyField='id' 
                        data={ this.state.orders } 
                        columns={ this.state.columns } />
                    </Card>
                </Container>
            </>
        )
    }



    componentDidMount() {
        axios.get('https://localhost:44396/api/orders/getorders').then(resp =>  {
            this.setState({
                orders: resp.data.orders
            });
        })
    }
}



export default OrdersTable;