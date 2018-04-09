import React, {Component} from 'react';
import './App.css';
import TicketList from "./components/TicketList";
import Title from "./components/Title";
import MyTicket from "./components/MyTicket";
import {fetchTickets} from "./components/Fetch";
import Authentication from "./components/Authetication/Authetication";
import Login from "./components/Authetication/Login";
import Logout from "./components/Authetication/Logout";
import {app, base} from "./components/Authetication/base";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Navigation } from './components/Navigation';

class App extends Component {

    state = {
        data: [],
        authenticated: false,
        loading: true, // estää välkkymisen kun sivu latautuu
        firebaseUserId: '',
        userRole: ''
    };

    componentDidMount() {
        this.fetchTicketsAndUpdate()
    }

    createNewUserToMysql() {
        const self = this; //?
        fetch('/api/users/createuser/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    firebaseUserId: self.state.firebaseUserId
                })

        })
            .then(function (body) {
                console.log("lähetetty body " + body);
            }.bind(this));
    }


    componentWillMount() {
        // LOGIN LISTENER
        // for undo
        this.removeAuthListner = app.auth().onAuthStateChanged((user) => {
                if (user) {

                    this.setState(
                        {
                            authenticated: true,
                            loading: false,
                            firebaseUserId: user.uid
                        }
                    )

                    this.createNewUserToMysql();

                } else {
                    this.setState({
                        authenticated: false,
                        loading: false
                    })
                }
                {console.log("authenticated: " + this.state.authenticated)}
                {console.log("user firebaseAuth: " + user.uid)}
            }
        )
    }


    componentWillUnmounth() {
        this.removeAuthListner(); // logout
    }

    fetchTicketsAndUpdate = () => {
        fetchTickets(function (tickets) {
            console.log("Tiketit haettu. " + tickets.length)
            this.setState({data: tickets});
        }.bind(this));
    }

    reFetchList = () => {
        this.fetchTicketsAndUpdate();
    }


    render() {
        console.log("App render");

        // jos lataa, niin ei vielä näytä mtn.
        if (this.state.loading === true) {
            return (
                // Näyttää tämän kunnes sivu on latautunut - näin ei tule välähdyksiä väärästä sisällöstä ennen sisäänkirjautumista
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        return (
            <div>
                {/*<Authentication authenticated={this.state.authenticated}/>*/}
                {this.state.authenticated === true ? <Navigation /> : null }
                <Title className="default" />
                <Login className="default" authenticated={this.state.authenticated}/>
                <Router>
                    <Route exact path="/login" render={(props) => {
                        return <Login setCurrentUser={this.setCurrentUser} {...props} />
                    }}/>
                </Router>



                {this.state.authenticated === true ? <TicketList reFetchList={this.reFetchList} data={this.state.data}/> : null}
                {this.state.authenticated === true ? <MyTicket reFetchList={this.reFetchList} firebaseUserId={this.state.firebaseUserId}/> :null}

            </div>
        );
    }

}

export default App;
