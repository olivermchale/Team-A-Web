import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';

function idFormatter (cell, row)  {
    return (
        <Link to = {`users/${row.id}`}>
            <span>{cell}</span>
        </Link>
    )
}

class AccountTable extends React.Component {
    state = {
        users: [],
        columns : [
            {
                dataField: 'firstName',
                text: 'Name',
                formatter: idFormatter
            },
            {
                dataField: 'email',
                text: 'Email'
            },
            {
                dataField: 'address',
                text: 'Address'
            },
            {
                dataField: 'isDeleteRequested',
                text: 'Delete Requested?'
            }
        ]
    }
    render() {
        if(!this.state.users[0])
        {
            return (
                <Container className="mt center">
                    <Spinner animation="border" role="status"></Spinner>
                    <h5> Loading Product, please wait... </h5>
                </Container>
            )
        }
        return (
            <>
                <Container style={{ marginTop: 50 }}>
                    <Card>
                        <BootstrapTable 
                        striped
                        bootstrap4
                        hover
                        keyField='id' 
                        data={ this.state.users } 
                        columns={ this.state.columns } />
                    </Card>
                </Container>
            </>
        )
    }



    componentDidMount() {
        axios.get('https://localhost:44375/api/accounts/getcustomers').then(resp =>  {
            this.setState({
                users: resp.data.customerAccounts
            });
        })
    }
}



export default AccountTable;