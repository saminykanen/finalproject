import React, {Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core'
import {app, facebookProvider, googleProvider} from "./base";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Logout from "./Logout";


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
                                }} placeholder="Email"/>
                                <input name="password" type="password" ref={(input) => {
                                    this.passwordInput = input
                                }} placeholder="password"/>

                                <button value="Login">Login/Register</button>
                            </label>
                            <label>
                                <button value="Reset" onClick={this.handleResetPassword}>Reset password</button>
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
                            <p> Kirjaudu sisään Facebook tai Google-tililläsi</p>
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
                            <div>
                                <button onClick={() => {
                                    this.autWithGoogle()
                                }}>Login with Google
                                </button>

                            </div>
                            : null}
                    </div>

                </div>
            </div>
        )
    }
}

export default Login;