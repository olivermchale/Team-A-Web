import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';

function idFormatter (cell, row)  {
    return (
        <Link to = {`accounts/${row.id}`}>
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
        return (
            <>
                <div className="container" style={{ marginTop: 50 }}>
                    <BootstrapTable 
                    striped
                    bootstrap4
                    hover
                    keyField='id' 
                    data={ this.state.users } 
                    columns={ this.state.columns } />
                </div>
            </>
        )
    }



    componentDidMount() {
        axios.get('https://localhost:44375/api/accounts/getcustomers').then(resp =>  {
            this.setState({
                users: resp.data
            });
        })
    }
}



export default AccountTable;