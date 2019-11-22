import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import axios from 'axios';

class TeamANavBar extends React.Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Team A</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        )
    }

    componentDidMount() {
        this.getData();
    }
    
    getData() {
        axios.get('https://localhost:44358/api/Brands/GetBrands').then(function (resp)  {
            console.log(resp);
        })
    }
}



export default TeamANavBar;