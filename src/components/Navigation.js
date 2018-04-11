import React from 'react';
import './Navigation.css';
import { Navbar } from 'react-bootstrap';
import academy_logo from '../images/academy_logo.png';
import academylogo from '../images/academylogo.png';

export const Navigation = () => (

<Navbar className="navbar">
    <Navbar.Header>
        <Navbar.Link href="/" ><img className="logo" src={academylogo}/>
        </Navbar.Link>
    <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
        <Navbar.Text pullRight>
            <Navbar.Link className="glyphicon glyphicon-user" href="/profile"> Profile</Navbar.Link>
        </Navbar.Text>
        <Navbar.Text pullRight>
            <Navbar.Link className="glyphicon glyphicon-log-out" href="/logout"> Logout</Navbar.Link>
        </Navbar.Text>
    </Navbar.Collapse>
</Navbar>
);
