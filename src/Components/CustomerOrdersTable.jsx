import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';

function idFormatter (cell, row)  {
    return (
        <Link to = {`oliswebsite/orders/${row.id}`}>
            <span>{cell}</span>
        </Link>
    )
}

function dateFormatter (cell, row) {
    let date = new Date(row.purchasedOn)
    return <p>{date.toDateString()}</p>
}

function statusFormatter (cell, row) {
    switch (row.purchasedOn) {
        case 0:
            return 'Pending';
            break;
        case 1:
            return 'Dispatched';
            break;
        case 2:
            return 'Delivered';
            break;
        case 3:
            return 'Cancelled';
            break;
        case 4:
            return 'Returned';
            break;
        case 5:
            return 'Unknown';
            break;
        default:
            return 'Unknown';
            break;
    }
}



class CustomerOrdersTable extends React.Component {
    state = {
        orders: [],
        columns : [
            {
                dataField: 'id',
                text: 'Product Name',
                formatter: idFormatter
            },
            {
                dataField: 'orderStatus',
                text: 'Order Status',
                formatter: statusFormatter
            },
            {
                dataField: 'purchasedOn',
                text: 'Purchase Date',
                formatter: dateFormatter
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
        if(!this.state.orders[0] && this.state.recieved)
        {
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
                <BootstrapTable 
                striped
                bootstrap4
                hover
                keyField='id' 
                data={ this.state.orders } 
                columns={ this.state.columns } />
            </Container>
        )
    }

    componentDidMount() {
        let userId = localStorage.getItem("currentUserId");
        axios.get(`${process.env.REACT_APP_ACCOUNT_URL}/api/accounts/getordersforcustomer?customerId=${userId}`).then(resp =>  {
            this.setState({
                orders: resp.data,
                recieved: true
            });
        }).catch(err => {
            console.log(err);
            this.setState({ 
                error: true
            })
        })
    }
}



export default CustomerOrdersTable;