import React from 'react';
import './Navigation.css';
import { Navbar } from 'react-bootstrap';



export const Navigation = () => (

<Navbar className="navbar">
        <Navbar.Text pullRight>
            <Navbar.Link className="glyphicon glyphicon-log-out" href="/logout"> </Navbar.Link>
        </Navbar.Text>
    <Navbar.Text pullRight>
        <Navbar.Link className="glyphicon glyphicon-user" href="#"> </Navbar.Link>
    </Navbar.Text>
</Navbar>
);
