import React from 'react';
import './Navigation.css';
import { Navbar } from 'react-bootstrap';



export const Navigation = () => (

<Navbar className="navbar">
    <Navbar.Header>
    <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
        <Navbar.Text pullRight>
            <Navbar.Link className="glyphicon glyphicon-log-out" href="/logout"> Logout</Navbar.Link>
        </Navbar.Text>
    <Navbar.Text pullRight>
        <Navbar.Link className="glyphicon glyphicon-user" href="#"> Profile</Navbar.Link>
    </Navbar.Text>
    </Navbar.Collapse>
</Navbar>
);
