import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function idFormatter (cell, row)  {
        if(row.product) {
            if(row.product.inStock) {
                return (
                <Link to = {`purchaseorders/purchase/${row.product.id}`}>
                    <span>{cell}</span>
                </Link>
                )
            }
        }
        return (
            <span>{cell}</span>
        );
}

function restockFormatter (cell, row) {
    if(row.product) {
        if(row.product.expectedRestock !== null) {
            if(row.product.expectedRestock === true) {
                return (
                    <p>Yes</p>
                )
            }
        }
    }
    return (
        <p>No</p>
    )
}

function stockFormatter (cell, row) {
    if(row.product) {
        if(row.product.inStock) {
            return (
                <p>Yes</p>
            )
        }
    }
    return (
        <p>No</p>
    )
}

class ProductsTable extends React.Component {
    
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
                dataField: 'product.name',
                text: 'Product Name',
                formatter: idFormatter
            },
            {
                dataField: 'source',
                text: 'Source'
            },
            {
                dataField: 'product.price',
                text: 'Price',
            },
            {
                dataField: 'product.inStock',
                text: 'In Stock?',
                formatter: stockFormatter
            },
            {
                dataField: 'product.expectedRestock',
                text: 'Restock Soon?',
                formatter: restockFormatter
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
                    data={ this.props.products } 
                    columns={ this.state.columns } />
                </Container>
            </>
        )
    }

    componentDidMount() {
        console.log(this.props);
    }

    

}



export default ProductsTable;
