import React, {Component} from 'react';
import './Navigation.css';
import {Navbar} from 'react-bootstrap';
import academy_logo from '../images/academy_logo.png';
import academylogo from '../images/academylogo.png';
import {app} from "./Authetication/base";
import MyTicket from "./MyTicket";


//export const Navigation = () => (
class Navigation extends Component {

    state = {
        username: null
    }

    componentWillMount() {
        app.auth().onAuthStateChanged((user) => {

            // console.log("navigaation tiedot päivittyi");
            if (user.displayName) {
                this.setState({
                    username: user.displayName,
                });
            } else {
                this.setState({
                    username: "Profile"
                });
            }
        });
    }

    render() {
        return (

            <Navbar fixedTop className="navbar">
                <Navbar.Header>
                    <Navbar.Link href="/"><img className="logo" src={academylogo}/>
                    </Navbar.Link>
                    <Navbar.Toggle className="toggleStyle"/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text pullRight>
                        <Navbar.Link className="glyphicon glyphicon-log-out letterSpacing" href="/logout"> Logout</Navbar.Link>
                    </Navbar.Text>
                    <Navbar.Text pullRight>
                        <Navbar.Link className="glyphicon glyphicon-user letterSpacing"
                                     href="/profile"> {this.state.username} </Navbar.Link>
                    </Navbar.Text>
                    <Navbar.Text pullRight>
                        <Navbar.Link className="glyphicon glyphicon-home letterSpacing" href="/"> Home</Navbar.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

        )

    }
}

export default Navigation;