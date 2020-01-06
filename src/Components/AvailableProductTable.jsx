import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Spinner } from 'react-bootstrap';

function idFormatter (cell, row)  {
    return (
        <Link to = {`purchaseorders/products/${row.ean}`}>
            <span>{cell}</span>
        </Link>
    )
}

class AvailableProductTable extends React.Component {
    
    state = {
        user: {

        },
        products: [],
        columns: [
            {
                dataField: 'name',
                text: 'Product Name',
                formatter: idFormatter
            },
            {
                dataField: 'categoryName',
                text: 'Category',
            }
        ]
    }
    render() {
        if(this.state.error) {
            return (
                <Container className="mt center">
                    <h5> Failed to load products </h5>
                </Container>
                )
        }
        if(!this.state.products[0])
        {
            return (
            <Container className="mt center">
                <Spinner animation="border" role="status"></Spinner>
                <h5> Loading Products, please wait... </h5>
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
                        data={ this.state.products } 
                        columns={ this.state.columns } />
                    </Card>
                </Container>
            </>
        )
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_PURCHASEORDERS_URL}/api/products/getavailableproducts`).then(resp =>  {
            this.setState({
                products: resp.data
            });
        }).catch(err => {
            console.log(err);
            this.setState({ 
                error: true
            })
        })
    }

    

}



export default AvailableProductTable;
