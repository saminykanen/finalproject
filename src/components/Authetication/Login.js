import React, {Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core'
import {app, facebookProvider} from "./base";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';


class Login extends Component {

    constructor(props) {
        super(props);
        this.autWithFacebook = this.autWithFacebook.bind(this);
        this.autWithEmailPassword = this.autWithEmailPassword.bind(this);
        this.state = {
            redirect: false
        }
    }

    autWithFacebook() {
        app.auth().signInWithPopup(facebookProvider)
            .then((result, error) => {
                if (error) {
                    this.toaster.show({intent: Intent.DANGER, message: "Unable to sign in with Facebook"})
                } else {
                    this.setState({redirect: true})
                }
            })
    }

    autWithEmailPassword(event) {
        event.preventDefault();

        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        app.auth().fetchProvidersForEmail(email)
            .then((providers) => {
                if (providers.length === 0) {
                    // jos, niin ei tiliä, niin luodaan
                    return app.auth().createUserWithEmailAndPassword(email, password)
                } else if (providers.indexOf("password") === -1) {
                    // user Facebook
                    this.loginForm.reset();
                    this.toaster.show({intent: Intent.WARNING, message: "Try an alternative login."})
                } else {
                    // sign user in
                    return app.auth().signInWithEmailAndPassword(email, password)
                }
            })
            .then((user) => {
                if (user && user.email) {
                    this.loginForm.reset();
                    this.setState({redirect: true})
                }
            })
            .catch((error) => {
                this.toaster.show({intent: Intent.DANGER, message: error.message})
            })
    }

    render() {

        if (this.state.redirect === true) {
            <Router>
                return <Redirect to=''/>
            </Router>
        }

        return (
            <div>

                <Toaster ref={(element) => {
                    this.toaster = element
                }}/>

                <button onClick={() => {
                this.autWithFacebook()
                }}>Login with Facebook
                </button>

                <div>
                    {this.props.authenticated === false ?
                        <form onSubmit={(event) => {
                            this.autWithEmailPassword(event)
                        }} ref={(form) => {
                            this.loginForm = form
                        }}>
                            <div>
                                <p> Kirjaudu sisään tai luo uusi käyttäjä</p>
                            </div>
                            <label>
                                Email <input name="email" type="email" ref={(input) => {
                                this.emailInput = input
                            }} placeholder="Email"></input>
                                Password <input name="password" type="password" ref={(input) => {
                                this.passwordInput = input
                            }} placeholder="Password"></input>
                                <button value="Login">Login with email</button>
                            </label>
                        </form>
                        :
                        <Router>
                            <Link className="link" to="/logout">
                                <button>Logout</button>
                            </Link>
                        </Router>}
                </div>


            </div>
        )
    }
}

export default Login;