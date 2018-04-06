import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {Toaster, Intent} from '@blueprintjs/core'
import {app, facebookProvider} from "./base";


class Logout extends Component {

    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    /*componentWillMount() {
        app.auth().signOut()
            .then(() => {
            this.setState({
                user: null
            })
        })
    }*/
    componentWillMount() {
        app.auth().signOut()
        .then((user) => {
            this.setState({
            redirect: true
            })
        })
    }

    render() {
        // tarvitaanko?
        if (this.state.redirect === true) {
            <Router>
                return <Redirect to='/'/>
            </Router>
        }

        return (
            <div>
                Loging out..
            </div>
        )
    }
}

export default Logout;