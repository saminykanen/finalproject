import React, {Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core'
import {app, facebookProvider, googleProvider} from "./base";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Logout from "./Logout";
import './Login.css';
import {Grid, Row, Col} from 'react-bootstrap';
// import {fblogin} from '../../images/FacebookButton.png';
import '../../bootstrap-social.css';


class Login extends Component {

    constructor(props) {
        super(props);
        this.autWithFacebook = this.autWithFacebook.bind(this);
        this.autWithEmailPassword = this.autWithEmailPassword.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.createNewUserToVerify = this.createNewUserToVerify.bind(this);
        this.state = {
            redirect: false
        }
    }

    autWithGoogle() {
        app.auth().signInWithPopup(googleProvider)
            .then(function (result) {
                // token = result.credential.accessToken;
                //var user = result.user;
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
                //var user = result.user;
                // console.log(user.displayName + " logged in");
                this.setState({redirect: true})
            }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("Facebook login error " + errorCode + errorMessage)
        });
    }

    async createNewUserToVerify(email, password, loginForm) {
        await app.auth().createUserWithEmailAndPassword(email, password);
        await app.auth().signInWithEmailAndPassword(email, password);

        var user = app.auth().currentUser;

        user.sendEmailVerification().then(function () {
            // Email sent.
            app.auth().signOut();

        }).catch(function (error) {
            // An error happened.
        });

        console.log("Testi", loginForm);
        if (loginForm)
            loginForm.reset();
    }

    async checkingIfEmailIsVerified(email, password, loginForm) {
        await app.auth().signInWithEmailAndPassword(email, password)
        var user = app.auth().currentUser;

        if (user.emailVerified === true) {
            return;
        } else {
            app.auth().signOut();
            if (loginForm) {
                loginForm.reset();
            }
        }
    }

    autWithEmailPassword(event) {
        event.preventDefault();

        const email = this.emailInput.value;
        const password = this.passwordInput.value;


        app.auth().fetchProvidersForEmail(email)
            .then((providers) => {
                if (providers.length === 0) {
                    // jos, niin ei tiliä, niin luodaan

                    this.createNewUserToVerify(email, password, this.loginForm);
                } else if (providers.indexOf("password") === -1) {
                    console.log("Email login error - email in use with Facebook or Gmail")
                    this.loginForm.reset();
                } else {
                    // sign user in

                    this.checkingIfEmailIsVerified(email, password, this.loginForm)
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

    /*autWithEmailPassword(event) {
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
    }*/

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
            <div>
            {this.props.authenticated === false ?
                <div>
                <Toaster ref={(element) => {
                    this.toaster = element
                }}/>

                <Grid className="loginForm" >
                    <Row className="center-block bgLoginForm">
                        <Col>
                            {this.props.authenticated === false ?
                                <h3>Login:</h3> : false}
                                <br/>
                            <div>
                                {this.props.authenticated === false ?
                                    <button className="btn btn-social-icon btn-facebook" style={{marginLeft: '5px', marginTop: '10px', marginRight: '5px'}} onClick={() => {
                                        this.autWithFacebook()
                                    }}></button>
                                    : null}
                                {this.props.authenticated === false ?
                                    <button className="btn btn-social-icon btn-google " style={{marginLeft: '5px', marginTop: '10px', marginRight: '5px'}} onClick={() => {
                                        this.autWithGoogle()
                                    }}></button>
                                    : null}
                            </div>
                            <br/>
                            <div>
                                {this.props.authenticated === false ?
                                    <form onSubmit={(event) => {
                                        this.autWithEmailPassword(event)
                                    }} ref={(form) => {
                                        this.loginForm = form
                                    }}> <h4>OR</h4>
                                        <h3>Create new user with email address</h3><br/>


                                        <label>
                                            <input className="form-control center-block" name="email" type="email" ref={(input) => {
                                                this.emailInput = input
                                            }} placeholder="Enter email"/>
                                            <input className="form-control center-block " name="password" type="password" ref={(input) => {
                                                this.passwordInput = input
                                            }} placeholder="Password"/><br/>
                                            <button className="btn btn-info buttonStyle" style={{marginLeft: '5px', marginTop: '10px', marginRight: '5px', fontSize: 'medium'}} value="Login" >Login/Register</button>

                                            <button className="btn btn-info buttonStyle" style={{marginLeft: '5px', marginTop: '10px', marginRight: '5px', fontSize: 'medium'}} value="Reset" onClick={this.handleResetPassword}>Reset password</button>

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
            : null}
            </div>
        )
    }
}

export default Login;