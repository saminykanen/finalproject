import React, {Component} from 'react';
import Navigation from './Navigation';
import Title from './Title';
import "./Profile.css";
import {app} from "../components/Authetication/base";

class Profile extends Component {

    state = {
        user: null, // firebaseuser
        username: null,
        userRole: null,
        firebaseUserId: null,
        courses: [],
        userlist: []
    };

    //********* POISTETAAN JOS SAADAAN STATESTA / PROPSEISTA  *************
    getUserInfoFromSQL = (callback) => {
        // get all users fcourses from MYSQL
        // var userid = this.state.user.currentUser.uid;
        var userid = this.state.firebaseUserId;
        console.log("userid " + this.state.firebaseUserId);
        var api = '/api/users/';
        return fetch(api + userid, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                callback(response)
            })
    };

    //********* POISTETAAN JOS SAADAAN STATESTA / PROPSEISTA  *************
    deleteCourse = (courseName) => {
        // e.preventDefault(); // tarvitaanko
        //const courseName = e.target.elements.newCourseName.value;
        console.log(courseName)

        var userId = app.auth().currentUser.uid;
        var api = '/api/users/removecourse/';

        console.log(userId)

        fetch(api + userId, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    courseName: courseName
                })
        });
        this.forceThePageRefresh();
    };

    deleteAccount = (e) => {
        e.preventDefault(); // tarvitaanko

        // poista firebasesta
        var user = app.auth().currentUser;
        console.log("poistosta halloo " + user.displayName)

        user.delete().then(function () {
            console.log("User deletoitu firebasesta");
        }).catch(function (error) {
            console.log("Error in deleting user from firebase");
        });

        // poista MySQL:stä
        var userid = user.uid;
        console.log(userid);
        this.deleteUserFromMysql(userid);

        // logOut käyttäjä
        this.props.history.push("/");
    };

    deleteUserFromMysql(userId) {
        console.log("Deleteuser function");
        var api = '/api/users/deleteuser/';
        return fetch(api + userId, {
            method: 'DELETE'
        });
    }

    // ADMIN TOIMINNOT *******************

    createANewCourse = (e) => {
        e.preventDefault();
        const newCourseName = e.target.elements.newCourseName.value;
        e.target.elements.newCourseName.value = null;

        // luo kurssi MySQLään
        var api = '/api/courses/createcourse/';
        return fetch(api, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    courseName: newCourseName
                }
            )
        }).then(
            this.addCourseToUsersOwnList(newCourseName)
        )

        // }).then(//function (callback) {
        //     console.log("JUUKELI EI LAUKEA") ///////////////////// EI TÄLLÄ HETKELLÄ TOIMI
        //    // callback();}
        // );
    };

    addCourseToUsersOwnList = (newCourseName) => {
        let userid = app.auth().currentUser.uid;
        let api = '/api/users/addcourse/';

        console.log("kurssi lisätty sun ilstaan");
        console.log("UID kurssin lisäys" + userid);

        fetch(api + userid, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courseName: newCourseName
                })
            }
        );
        this.forceThePageRefresh();
        console.log("JUUKELI")
    };


    getUserNamesFromSQL = (callback) => {
        // get all users from MySQL
        var api = '/api/users/';
        return fetch(api, {
            method: 'GET'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                callback(response)
            })
    };


    toggleUserRights = (e) => {
        // anna REST:in kautta käyttäjälle admin oikeudet TAI muuta takaisin studentiksi

        e.preventDefault();
        const userToBeModified = e.target.elements.selectedUser.value;
        //console.log("tätä käyttäjää muokataan " + userToBeModified);

        var userid = userToBeModified
        //var userid = user.uid;

        var api = '/api/users/togglerole/';
        return fetch(api + userid, {method: 'PUT'})
            .then(
                // haetaan uudestaan käyttäjät jotta voidaan rakentaa uudestaan drop-downlista
                this.getUserNamesFromSQL(function (allUsers) {
                    this.setState(
                        {userlist: allUsers}
                    );
                }.bind(this))
            ).then(
                this.forceThePageRefresh()
            )
    };

    componentWillMount() {

        // ADMIN
        console.log("componentWillMount");

        // asettaa firebase ID:n
        app.auth().onAuthStateChanged((user) => {
            this.setState({
                firebaseUserId: user.uid,
                username: user.displayName,
                user: user
            });
            // console.log("user" + user.displayName)
            // console.log("uid" + user.uid)
            // console.log("firebaseUserId" + this.state.firebaseUserId)

            // hakee käyttäjä tiedot MySQL:stä
            this.getUserInfoFromSQL(function (user) {
                this.setState({
                    courses: user.courses,
                    userRole: user.userRole
                });
            }.bind(this));
        });


        // hakee käyttäjät jotta niiden oikeuksia voidaan muokata
        this.getUserNamesFromSQL(function (allUsers) {
            this.setState(
                {userlist: allUsers}
            );
            console.log("käyttäjät haettu TESTII");
            console.log(allUsers);
        }.bind(this))

    }

    componentWillUpdate() {
        console.log("componentWillUpdate");

    }

    // tämä ajetaan aina kun halutaan päivittää sivu - eli kun käyttäjä tekee jonkun muuton
    forceThePageRefresh = (e) => {

        // päivitä userin kurssit
        this.getUserInfoFromSQL(function (user) {
            this.setState({
                courses: user.courses,
                userRole: user.userRole
            });
        }.bind(this));

        // hakee käyttäjät jotta niiden oikeuksia voidaan muokata
        this.getUserNamesFromSQL(function (allUsers) {
            this.setState(
                {userlist: allUsers}
            );
            console.log("käyttäjät haettu TESTII");
            console.log(allUsers);
        }.bind(this))


        this.setState(this.state) // dumb easy: triggers render
    };

    render() {
        console.log("render username" + this.props.username)
        console.log("render");

        // USER

        // tekee listan käyttäjän omista kursseista
        var deleteCourse = this.deleteCourse; // muuttuja
        var courseList = this.state.courses.map(
            function (course, index) {
                return (
                    <Course coursename={course.courseName} key={index} deleteCourse={deleteCourse}/>
                );
            });

        /*
        // userstatukset asetus purkkakoodilla
        var userstatus = this.state.userlist.map(
            function (user, index) {
                return (
                    <Course coursename={course} key={index} deleteCourse={deleteCourse}/>
                );
            });

*/

        // ADMIN


        return (
            <div className="height">
                <Navigation/>
                <Title/>
                <div className="profileStyle profile">
                    <div>
                        <h2 className="header23Style">Profile information</h2>
                        <h4 className="header4Style"><b>Username:</b> {this.state.username}</h4>
                        <h4 className="header4Style"><b>User role:</b> {this.state.userRole}</h4>
                        <h4 className="header4Style"><b>Delete your account: </b><button className="glyphicon glyphicon-trash trash" onClick={this.deleteAccount}/>
                        </h4>
                    </div>
                    <div>
                        <h3 className="header23Style">Your courses</h3>
                        <div className="similarToh4">
                            {courseList}
                        </div>

                    </div>

                    {/*ADMIN*/}
                    <div>
                        <h2 className="header23Style">Administrator</h2>
                    </div>
                    <div>
                        <h4 className="header4Style">Create new course:</h4>
                        <form onSubmit={this.createANewCourse}>
                            <input className="form-control similarToh4 input-customs stylish" type="text"
                                   name="newCourseName" style={{display: 'inline-block'}}
                                   placeholder="Name of new course..."/>
                            <button className="btn buttonStyle btn-md" style={{marginLeft: '10px', marginBottom: '3px', display: 'inline-block'}}>CREATE</button>
                        </form>
                    </div>

                    <div>
                        <h4 className="header4Style">Give teacher rights to student:</h4>
                        <form onSubmit={this.toggleUserRights}>
                            <select style={{display: 'inline-block'}} className="form-control similarToh4 input-customs stylish" name="selectedUser">
                                {this.state.userlist.map((e, key) => {
                                    if (e.userRole === "student") {
                                        return <option key={key} value={e.firebaseUserId}>{e.username}</option>
                                    }
                                })}
                            </select>
                            <button className="btn buttonStyle btn-md" style={{marginLeft: '10px', marginBottom: '3px', display: 'inline-block'}}>GRANT</button>
                        </form>
                        <h4 className="header4Style">Give student rights to teacher:</h4>
                        <form onSubmit={this.toggleUserRights}>
                            {/*<p>Select course</p>*/}
                            {/*<select name="courseDropdown">*/}
                            {/*{this.state.countryData.map((e, key) => {*/}
                            {/*return <option key={key} value={e.courseId}>{e.courseName}</option>;*/}
                            {/*})}*/}
                            {/*</select>*/}
                            <select style={{display: 'inline-block'}} className="form-control similarToh4 input-customs stylish" name="selectedUser">
                                {this.state.userlist.map((e, key) => {
                                    if (e.userRole === "teacher") {
                                        return <option key={key} value={e.firebaseUserId}>{e.username}</option>
                                    }
                                })}
                            </select>
                            <button className="btn buttonStyle btn-md" style={{marginLeft: '10px', marginBottom: '3px', display: 'inline-block'}}>GRANT</button>
                        </form>
                    </div>

                    <button onClick={this.forceThePageRefresh}>Refresh!</button>

                </div>
            </div>
        );

    }


}

export default Profile;


class Course extends Component {

    removeCourse = (e) => {
        e.preventDefault(); // tarvitaanko
        this.props.deleteCourse(this.props.coursename);

    };

    render() {
        return (
            <div>
                <h4>{this.props.coursename}
                    <button className="glyphicon glyphicon-trash trash" onClick={this.removeCourse}></button>
                </h4>
            </div>
        )
    };
}

export {Course};