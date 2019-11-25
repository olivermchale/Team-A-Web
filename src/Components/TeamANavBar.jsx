import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

class TeamANavBar extends React.Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                <LinkContainer to="/">
                <Navbar.Brand href="#home">Team A</Navbar.Brand>
                </LinkContainer>
                    
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/users">
                            <Nav.Link>Users</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/etc">
                            <Nav.Link >Etc</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </>
        )
    }

    componentDidMount() {
        this.getData();
    }
    
    getData() {
        axios.get('https://localhost:44375/api/accounts/getcustomers').then(function (resp)  {
            console.log(resp);
        })
    }
}



export default TeamANavBar;