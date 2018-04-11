import React, {Component} from 'react';
import './App.css';
import TicketList from "./components/TicketList";
import Title from "./components/Title";
import MyTicket from "./components/MyTicket";
import {fetchTickets} from "./components/Fetch";
import Login from "./components/Authetication/Login";
import {app} from "./components/Authetication/base";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Navigation} from './components/Navigation';
import nocourseimg from './images/nocourseimg.png';
import Profile from "./components/Profile";
import Logout from "./components/Authetication/Logout";
import bgimg from './images/background.jpg';

class App extends Component {

    state = {
        data: [],
        loading: true, // estää välkkymisen kun sivu latautuu
        authenticated: false, // kirjautunut tai ei
        user: null, // firebase object
        firebaseUserId: '', // firebase
        username: null, // firebase
        email: null,// firebase
        courses: [], // mySql käyttäjän kurssilista
        userRole: null, // mySql
        courseId: null
    };

    render() {

        const MyProfile = (props) => {
            return (
                <Profile
                    userRole = {this.state.userRole}
                    username = {this.state.username}
                    {...props}
                />
            );
        }

        return(
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact name="index" path="/" component={TicketService}/>
                        <Route exact path="/login" render={(props) => {
                            return <Login {...props} /> }}/>
                        <Route exact path="/profile" render={MyProfile} />
                        <Route exact path="/logout" component={Logout}/>
                    </Switch>
                </div>
            </Router>);
    }
}

export default App;

class TicketService extends Component {

    state = {
        data: [],
        loading: true, // estää välkkymisen kun sivu latautuu
        authenticated: false, // kirjautunut tai ei
        user: null, // firebase object
        firebaseUserId: '', // firebase
        username: null, // firebase
        email: null,// firebase
        courses: [], // mySql käyttäjän kurssilista
        userRole: null, // mySql
        courseId: null

    };

    componentDidMount() {
            this.fetchTicketsAndUpdate();
    }

    createNewUserToMysql() {
        const self = this; //?
        return fetch('/api/users/createuser/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    firebaseUserId: self.state.firebaseUserId,
                    username: self.state.username
                })
        })
            .then(function (body) {
                console.log("lähetetty body " + body);
            })
    }


    fetchUserInfoFromMysql = (callback) => {
        var api = '/api/users/';
        var id = this.state.firebaseUserId;
        fetch(api + id, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (users) {

                var currentUser = app.auth().currentUser;
                // console.log("currentUser  fetchUserInfoFromMysql" + currentUser);
                if (currentUser) {
                    callback(users);
                }
            })
    };

    updateUserCourses(courseN) {
        console.log("kurssinlisäyskutsu");
        var courseName = courseN;
        var api = '/api/users/addcourse/';
        var userid = this.state.firebaseUserId;
        return fetch(api + userid, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                courseName: courseName
            })
        })
            .then(function () {
                console.log("lähetetty body " + courseN);
            }.bind(this));
    }


    componentWillMount() {
        // LOGIN LISTENER
        this.removeAuthListner = app.auth().onAuthStateChanged((user) => {

            // var currentUser = app.auth().currentUser;
            // console.log("currentUser " + currentUser);

            if (user) {
                // console.log("componentWillMount - USER")
                // console.log("auth tila " + this.state.authenticated.toString())

                this.setState({
                    authenticated: true,
                    loading: false,
                    firebaseUserId: user.uid,
                    user: user,
                    username: user.displayName,
                    email: user.email
                });
                // console.log("userState päivitetty");
                // console.log("auth tila " + this.state.authenticated.toString())

                //  KÄYTTÄJÄN SQL KYSELYT ALLE

                //  if (this.state.authenticated.true) {
                // luodaan käyttäjä myös MySQL:ään
                this.createNewUserToMysql() // palauttaa promisen
                // haetaan käyttäjä vasta kun MySQL on luotu
                    .then(function () {
                        this.fetchUserInfoFromMysql(function (users) {
                            this.setState({
                                userRole: users.userRole,
                                courses: users.courses
                            })
                        }.bind(this));
                    }.bind(this));
                //  }

            } else {
                // console.log("componentWillMount - ELSE")
                // console.log("auth tila " + this.state.authenticated.toString())
                this.setState({
                    authenticated: false,
                    loading: false,
                    firebaseUserId: null,
                    user: null,
                    username: null,
                    email: null
                })
            }
        })
    }

    // ALLA OLEVA KURSSILISTA HAKUUN

    // componentDidUpdate (){
    //     this.fetchUserInfoFromMysql(function (users) {
    //         this.setState({
    //             userRole: users.userRole,
    //             courses: users.courses
    //         });
    //         console.log("käyttäjätiedot päivitetty")
    //     }.bind(this));
    // };


    componentWillUnmount() {
        this.removeAuthListner(); // logout
    }


    fetchTicketsAndUpdate = (courseId) => {

        //   if (!courseId) courseId = 'Java-kurssi';  // virhekäisttelyn voi heittää tähänkin
        fetchTickets(function (tickets) {
            // console.log("Tiketit haettu. " + tickets.length)
            this.setState({data: tickets, courseId: courseId});
        }.bind(this), courseId);
    }

    fetchCourseTickets = (e) => {
        e.preventDefault();
        const id = e.target.elements.kurssiId.value;
        this.updateUserCourses(id)
            .then(function () {
                this.fetchUserInfoFromMysql(function (users) {
                    this.setState({
                        userRole: users.userRole,
                        courses: users.courses
                    })
                }.bind(this));
            }.bind(this));
        this.fetchTicketsAndUpdate(id); // numeron voi hakea tekstikentästäkin

    }

    reFetchList = (courseId) => {
        this.fetchTicketsAndUpdate(courseId);
    }

    /*    fetchCoursesAndUpdate = () => {
            fetchCourses(function (courses) {
                console.log("Kurssit haettu. " + courses.length)
                this.setState({coursesData: courses});
            }.bind(this));
        }

        reFetchCourses = () => {
            this.fetchCoursesAndUpdate();
        }*/

    showStuffBasedOnLoginAndCourseStatus() {
        if (this.state.courses.length !== 0 && this.state.authenticated === true) {
            return (

                <div>
                    <form className="default" onSubmit={this.fetchCourseTickets}>
                            <input className="form-control center-block input-customs" type="text" name="kurssiId"
                                   placeholder="Course..."/>
                            <button className="btn btn-info btn-customs"><i className="glyphicon glyphicon-search"/>
                            </button>
                    </form>
                    <TicketList reFetchList={this.reFetchList} data={this.state.data}
                                username={this.state.firebaseUserId} userRole={this.state.userRole} courseId={this.state.courseId}/>
                    <MyTicket reFetchList={this.reFetchList} firebaseUserId={this.state.firebaseUserId}
                              userRole={this.state.userRole} username={this.state.username}
                              courseId={this.state.courseId}/>
                </div>
            )
        } else if (this.state.authenticated === true && this.state.courses.length === 0) {

            return (
                <div className="transparent">
                    <form className="default" onSubmit={this.fetchCourseTickets}>
                        <input className="form-control center-block input-customs" type="text" name="kurssiId"
                               placeholder="Course..."/>
                        <button className="btn btn-info btn-customs"><i className="glyphicon glyphicon-search"/>
                        </button>
                    </form>
                    <img className="centered img-responsive" style={{padding: '0px'}} src={nocourseimg}/>
                </div>
            )
        }
        /*else{
                    return(
                        <MyTicket reFetchList={this.reFetchList} firebaseUserId={this.state.firebaseUserId} userRole={this.state.userRole} username={this.state.username}/>
                    )
                }*/
    }

    render() {
        console.log("App render");

        // jos lataa, niin ei vielä näytä mtn.
        if (this.state.loading === true) {
            const Loading = require('react-loading-animation');
            return (
                // Näyttää tämän kunnes sivu on latautunut - näin ei tule välähdyksiä väärästä sisällöstä ennen sisäänkirjautumista
                //jos virhe latautumisessa, lataa komentoriviltä: npm i react-loading-animation
                <div>
                    <Loading className="load"/>
                </div>
            );
        }

        var style = {fontSize: 12, lineHeight: 0.5, textAlign: 'left', position: 'relative'};
        var stateValues = (
            <div>
                <p>DEBUG CONSOLE</p>
                <p> loading; {this.state.loading.toString()}</p>
                <p> firebaseUserId; {this.state.firebaseUserId}</p>
                <p> authenticated: {this.state.authenticated.toString()}</p>
                <p> kurssiId: {this.state.courseId}</p>
                <p> username: {this.state.username}</p>
                <p> email: {this.state.email}</p>
                <p> userRole: {this.state.userRole}</p>
            </div>
        );

        return (
            <div style={{marginTop: '40px'}}>
                {/*<Authentication authenticated={this.state.authenticated}/>*/}
                {this.state.authenticated === true ? <Navigation/> : null}
                <Title className="default"/>
                <Login className="default" authenticated={this.state.authenticated}/>

                {/*DEBUG CONSOLE*/}
                {/*<div style={style}>{stateValues}</div>*/}


                {/*                {this.state.courses.length !== 0 ? <form onSubmit={this.fetchCourseTickets}>
                    <input type="text" name="kurssiId" placeholder="ID"/>
                    <button>Find course</button></form> :
                    <div>
                {this.state.authenticated === true ? <form onSubmit={this.fetchCourseTickets}>
                        <input type="text" name="kurssiId" placeholder="ID"/>
                        <button>Find course</button>
                    </form> : null}
                {this.state.authenticated === true ?
                    <TicketList reFetchList={this.reFetchList} data={this.state.data} username={this.state.firebaseUserId} userRole={this.state.userRole}/> : null}
                {this.state.authenticated === true ?

                    <MyTicket reFetchList={this.reFetchList} firebaseUserId={this.state.firebaseUserId} userRole={this.state.userRole} username={this.state.username}/> : null}
                    </div>}*/}

                {this.showStuffBasedOnLoginAndCourseStatus()}
                {/*{this.showMyTicketEvenIfTicketDataIsEmpty()}*/}
            </div>
        );
    }

}