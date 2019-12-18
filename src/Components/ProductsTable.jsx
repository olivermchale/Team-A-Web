import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class ProductsTable extends React.Component {

    idFormatter = (cell, row) => {
        if (row.inStock) {
            return (
                <Link onClick={() => this.updateProps(row)} to={`/purchaseorders/products/purchase/${row.id}`}>
                    <span>{cell}</span>
                </Link>
            )
        }
        return (
            <span>{cell}</span>
        )
    }
    restockFormatter = (cell, row) => {
        if (row.product) {
            if (row.product.expectedRestock !== null) {
                if (row.product.expectedRestock === true) {
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

    stockFormatter = (cell, row) => {
        if (row.inStock) {
            return (
                <p>Yes</p>
            )
        }
        return (
            <p>No</p>
        )
    }

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
                formatter: this.idFormatter
            },
            {
                dataField: 'source',
                text: 'Source'
            },
            {
                dataField: 'price',
                text: 'Price',
            },
            {
                dataField: 'inStock',
                text: 'In Stock?',
                formatter: this.stockFormatter
            },
            {
                dataField: 'expectedRestock',
                text: 'Restock Soon?',
                formatter: this.restockFormatter
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
                        data={this.props.products}
                        columns={this.state.columns} />
                </Container>
            </>
        )
    }

    updateProps = (row) => {
        this.props.dispatch(
            {
                type: "PURCHASE", 
                id: row.id, 
                price: row.price, 
                name: row.name, 
                source: row.source,
                externalId: row.externalId
            }
        );
    }

    componentDidMount() {
        console.log(this.props);
    }

    clicked = () => {
        console.log(this.props);
        console.log(this.state);
    }



}



export default connect()(ProductsTable);
