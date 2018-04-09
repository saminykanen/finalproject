import React, {Component} from 'react';
import './App.css';
import TicketList from "./components/TicketList";
import Title from "./components/Title";
import MyTicket from "./components/MyTicket";
import {fetchCourses, fetchTickets} from "./components/Fetch";
import Login from "./components/Authetication/Login";
import {app, base} from "./components/Authetication/base";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import CoursesList from "./components/CoursesList";


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
        course: null // aktiivinen kurssi jonka tiketit näkyy
    };

    componentDidMount() {
        this.fetchTicketsAndUpdate()
        // this.fetchCoursesAndUpdate()
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
                callback(users);
            })
    };


    componentWillMount() {
        // LOGIN LISTENER
        this.removeAuthListner = app.auth().onAuthStateChanged((user) => {
            if (user) {

                this.setState({
                    authenticated: true,
                    loading: false,
                    firebaseUserId: user.uid,
                    user: user,
                    username: user.displayName,
                    email: user.email
                });
                console.log("userState päivitetty")
                //  KÄYTTÄJÄN SQL KYSELYT ALLE
                this.createNewUserToMysql(); // luodaan käyttäjä myös MySQL:ään

                this.fetchUserInfoFromMysql(function (users) {
                    console.log(users.userRole)
                    console.log(users.courses)
                    this.setState({
                    userRole: users.userRole
                    })
                }.bind(this));

                // var api = '/api/users/';
                // //var id = this.state.firebaseUserId;
                // var id = 'Samu';
                // fetch(api + id, {
                //     method: 'GET'
                // })
                //     .then(function (response) {
                //         return response.json();
                //     })
                //     .then(function (users) {
                //         this.setState({
                //             userRole: users.userRole
                //         })
                //     }).bind(this);


            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                    firebaseUserId: null,
                    user: null,
                    username: null,
                    email: null
                })
            }
        });
    }

    componentWillUnmounth() {
        this.removeAuthListner(); // logout
    }

    fetchTicketsAndUpdate = (courseId) => {
        if (!courseId) courseId = 1;  // virhekäisttelyn voi heittää tähänkin
        fetchTickets(function (tickets) {
            console.log("Tiketit haettu. " + tickets.length)
            this.setState({data: tickets, courseId: courseId});
        }.bind(this), courseId);
    }

    fetchCourseTickets = (e) => {
        e.preventDefault();
        const id = e.target.elements.kurssiId.value;
        // this.setState({courseId:id});
        this.fetchTicketsAndUpdate(id); // numeron voi hakea tekstikentästäkin
    }

    reFetchList = () => {
        this.fetchTicketsAndUpdate();
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

            <div className="App">

                {/*DEBUG CONSOLE*/}
                {/*<div style={style}>{stateValues}</div>*/}


                <Login authenticated={this.state.authenticated}/>


                <Router>
                    <Route exact path="/login" render={(props) => {
                        return <Login setCurrentUser={this.setCurrentUser} {...props} />
                    }}/>
                </Router>


                <Title/>
                {this.state.authenticated === true ? <form onSubmit={this.fetchCourseTickets}>
                    <input type="text" name="kurssiId" placeholder="ID"/>
                    <button>Kirahvi</button>
                </form> : null}

                {this.state.authenticated === true ?
                    <TicketList reFetchList={this.reFetchList} data={this.state.data}/> : null}
                {this.state.authenticated === true ?
                    <MyTicket reFetchList={this.reFetchList} firebaseUserId={this.state.firebaseUserId}/> : null}

            </div>
        );
    }

}

export default App;
