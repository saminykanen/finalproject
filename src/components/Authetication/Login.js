import React, {Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core'
import {app, facebookProvider, googleProvider} from "./base";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Logout from "./Logout";


class Login extends Component {

    constructor(props) {
        super(props);
        this.autWithFacebook = this.autWithFacebook.bind(this);
        this.autWithEmailPassword = this.autWithEmailPassword.bind(this);
        this.state = {
            redirect: false
        }
    }

    autWithGoogle() {
        app.auth().signInWithPopup(googleProvider)
            .then((result, error) => {
                if (error) {
                    this.toaster.show({intent: Intent.DANGER, message: "Unable to sign in with Google"})
                } else {
                    this.setState({redirect: true})
                }
            })
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

                {this.props.authenticated === false ?
                    <div><p>Kirjaudu sisään sähköpostitilillä tai rekisteröidy</p></div> : false}

                <div>
                    {this.props.authenticated === false ?
                        <form onSubmit={(event) => {
                            this.autWithEmailPassword(event)
                        }} ref={(form) => {
                            this.loginForm = form
                        }}>

                            <div>
                                <p> Login or create a new user</p>
                            </div>

                            <label>
                                <input name="email" type="email" ref={(input) => {
                                    this.emailInput = input
                                }} placeholder="Email"></input>
                                <input name="password" type="password" ref={(input) => {
                                    this.passwordInput = input
                                }} placeholder="Password"></input>
                                <button value="Login">Login/Register</button>
                            </label>
                        </form>
                        :
                        <Router>
                            <div>
                                <div>
                                    <Switch>
                                        <Route exact path="/logout" component={Logout}/>
                                    </Switch>
                                </div>
                                <Link to="/logout">
                                    <button>Logout</button>
                                </Link>
                            </div>
                        </Router>
                    }

                    {this.props.authenticated === false ?
                        <div>
                            <p> Kirjaudu sisään Facebook-tililläsi</p>
                        </div> : null}

                    <div>
                        {this.props.authenticated === false ?
                            <button onClick={() => {
                                this.autWithFacebook()
                            }}>Login with Facebook
                            </button>
                            : null}
                    </div>

                    <div>
                        {this.props.authenticated === false ?
                            <button onClick={() => {
                                this.autWithGoogle()
                            }}>Login with Google
                            </button>
                            : null}
                    </div>

                </div>
            </div>
        )
    }
}

export default Login;