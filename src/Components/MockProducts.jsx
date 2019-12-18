import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function idFormatter (cell, row)  {
    return (
        <Link to = {`purchaseorders/products/${row.ean}`}>
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
                name: 'product 1',
                ean: '5 102310 300103'
            },
            {
                id: '2',
                name: 'product 2',
                ean: '5 102310 200102'
            },
            {
                id: '3',
                name: 'product 3',
                ean: '5 102310 100101'
            },
            {
                id: '4',
                name: 'product 4',
                ean: '5 102310 200314'
            },
            {
                id: '5',
                name: 'product 5',
                ean: '5 102310 100306'
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
                    <Card>
                        <BootstrapTable 
                        striped
                        bootstrap4
                        hover
                        keyField='id' 
                        data={ this.state.products } 
                        columns={ this.state.columns } />
                    </Card>
                </Container>
            </>
        )
    }

    

}



export default MockProducts;
