import React, {Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core'
import {app, facebookProvider, googleProvider} from "./base";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Logout from "./Logout";
import './Login.css';
import {Grid, Row, Col} from 'react-bootstrap';


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
            <div className="loginForm">
                <Toaster ref={(element) => {
                    this.toaster = element
                }}/>

                <Grid>
                    <Row>
                        <Col xs={12} sm={6} md={8}>
                            {this.props.authenticated === false ?
                                <p>Login with Facebook or Google</p> : false}
                                <div>
                            {this.props.authenticated === false ?
                                        <button className="facebook" onClick={() => {
                                            this.autWithFacebook()
                                        }}>Facebook</button>
                                        : null}
                                {this.props.authenticated === false ?
                                    <button className="btn btn-info" onClick={() => {
                                        this.autWithGoogle()
                                    }}>Login with Google
                                    </button>
                                    : null}
                                </div>
                            <div>
                                <p>Create new user with email address</p>
                                {this.props.authenticated === false ?
                                    <form onSubmit={(event) => {
                                        this.autWithEmailPassword(event)
                                    }} ref={(form) => {
                                        this.loginForm = form
                                    }}>

                                        <label>
                                            <input name="email" type="email" ref={(input) => {
                                                this.emailInput = input
                                            }} placeholder="Enter email"/><br/>
                                            <input name="password" type="password" ref={(input) => {
                                                this.passwordInput = input
                                            }} placeholder="Password"/><br/>
                                            <button value="Login">Login/Register</button>
                                        </label>
                                    </form>
                                    :
                                    <Router>
                                        <div>
                                            <Switch>
                                                <Route exact path="/logout" component={Logout}/>
                                            </Switch>
                                        </div>
                                    </Router>
                                }
                            </div>
                        </Col>
                    </Row>
                </Grid>

                {/*<div>
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
                </div>*/}
                {/*<div>
                                    {this.props.authenticated === false ?
                                        <form onSubmit={(event) => {
                                            this.autWithEmailPassword(event)
                                        }} ref={(form) => {
                                            this.loginForm = form
                                        }}>

                                            <label>
                                <input name="email" type="email" ref={(input) => {
                                    this.emailInput = input
                                }} placeholder="Enter email"/><br/>
                                <input name="password" type="password" ref={(input) => {
                                    this.passwordInput = input
                                }} placeholder="Password"/><br/>
                                <button value="Login">Login/Register</button>
                            </label>
                        </form>
                        :
                        <Router>
                            <div>
                                <Switch>
                                    <Route exact path="/logout" component={Logout}/>
                                </Switch>
                            </div>
                        </Router>
                    }
                </div>*/}
            </div>
        )
    }
}

export default Login;