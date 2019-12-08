import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function idFormatter (cell, row)  {
    return (
        <Link to = {`purchaseorders/products/${row.id}`}>
            <span>{cell}</span>
        </Link>
    )
}

class MockProducts extends React.Component {
    
    state = {
        user: {

        },
        products: [
            {
                id: '1',
                name: 'product 1'
            },
            {
                id: '2',
                name: 'product 2'
            },
            {
                id: '3',
                name: 'product 3'
            },
            {
                id: '4',
                name: 'product 4'
            },
            {
                id: '5',
                name: 'product 5'
            },
        ],
        columns: [
            {
                dataField: 'name',
                text: 'Product Name',
                formatter: idFormatter
            },
        ]
    }
    render() {
        return (
            <>
                <Container style={{ marginTop: 50 }}>
                    <BootstrapTable 
                    striped
                    bootstrap4
                    hover
                    keyField='id' 
                    data={ this.state.products } 
                    columns={ this.state.columns } />
                </Container>
            </>
        )
    }

    

}



export default MockProducts;
