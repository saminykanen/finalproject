import React, {Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core'
import {app, facebookProvider, googleProvider} from "./base";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Logout from "./Logout";
import './Login.css';
import {Grid, Row, Col} from 'react-bootstrap';


class Login extends Component {

    constructor(props) {
        super(props);
        this.autWithFacebook = this.autWithFacebook.bind(this);
        this.autWithEmailPassword = this.autWithEmailPassword.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.state = {
            redirect: false
        }
    }

    autWithGoogle() {
        app.auth().signInWithPopup(googleProvider)
            .then(function (result) {
                // token = result.credential.accessToken;
                var user = result.user;
                // console.log(user.displayName + " logged in");
                this.setState({redirect: true})
            }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Gmail login error " + errorCode + errorMessage)
        });
    }
    autWithFacebook() {
        app.auth().signInWithPopup(facebookProvider)
            .then(function (result) {
                // var token = result.credential.accessToken;
                var user = result.user;
                // console.log(user.displayName + " logged in");
                this.setState({redirect: true})
            }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Facebook login error " + errorCode + errorMessage)
        });
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
                    console.log("Email login error - email in use wiht Facebook or Gmail" )
                    this.loginForm.reset();
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

    handleResetPassword() {
        console.log('resetting password')

        let auth = app.auth();
        auth.sendPasswordResetEmail(this.emailInput.value).then(function () {
            console.log('email sent?');
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {


        return (
            <div className="loginForm">
                <Toaster ref={(element) => {
                    this.toaster = element
                }}/>

                <Grid>
                    <Row>
                        <Col>
                            {this.props.authenticated === false ?
                                <p>Login with Facebook or Google:</p> : false}
                            <div>
                                {this.props.authenticated === false ?
                                    <button className="btn btn-info" style={{marginRight: '10px'}} onClick={() => {
                                        this.autWithFacebook()
                                    }}>Login with Facebook</button>
                                    : null}
                                {this.props.authenticated === false ?
                                    <button className="btn btn-info" onClick={() => {
                                        this.autWithGoogle()
                                    }}>Login with Google
                                    </button>
                                    : null}
                            </div>
                            <br/>
                            <div>
                                {this.props.authenticated === false ?
                                    <form onSubmit={(event) => {
                                        this.autWithEmailPassword(event)
                                    }} ref={(form) => {
                                        this.loginForm = form
                                    }}><p>Create new user with email address</p>


                                        <label>
                                            <input className="form-control center-block" name="email" type="email" ref={(input) => {
                                                this.emailInput = input
                                            }} placeholder="Enter email"/>
                                            <input className="form-control center-block " name="password" type="password" ref={(input) => {
                                                this.passwordInput = input
                                            }} placeholder="Password"/><br/>
                                            <button className="btn btn-info" value="Login" >Login/Register</button>
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
            </div>
        )
    }
}

export default Login;