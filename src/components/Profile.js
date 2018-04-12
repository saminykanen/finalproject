import React, {Component} from 'react';
import Navigation from './Navigation';
import Title from './Title';
import "./Profile.css";
import {app} from "../components/Authetication/base";

class Profile extends Component {

    //Tietojen suojaus!! ei näy, jos ei ole kirjautunut sissään!
    //Tänne tulee profiilin tiedot, käyttäjätunnus ja email
    //Omat kurssit, rooli -> Selostus, että mitä voi tehdä oppilaana? Saako sellasta infopalkkia esim?
    //Uuden kurssin lisääminen
    //Opettajalle lisäominaisuus: lisää uusia oppilaita opettajiksi

    state = {
        user: null, // firebaseuser
        username: null,
        userRole: null,
        firebaseUserId: null,
        courses: ["Java-kurssi", "React-kurssi", "Pelle-kurssi"],
        userlist: []
        //     {
        //         firebaseUserId: "uediACnXUXezVoHjJIrpzqXoQfU2",
        //         userRole: "teacher",
        //         username: "admin",
        //         courses: [
        //             {
        //                 courseId: 1,
        //                 courseName: "Java-kurssi"
        //             },
        //             {
        //                 courseId: 2,
        //                 courseName: "React-kurssi"
        //             }
        //         ]
        //     },
        //     {
        //         firebaseUserId: "s6cq6NBFojdUnQWL44sqL9709c02",
        //         userRole: "student",
        //         username: "Tommi",
        //         courses: []
        //     },
        //     {
        //         firebaseUserId: "GGWiEnFIRqTRwQngxESZouEnlX23",
        //         userRole: "student",
        //         username: "Veli-Pekka Nurmi",
        //         courses: [
        //             {
        //                 courseId: 1,
        //                 courseName: "Java-kurssi"
        //             }
        //         ]
        //     }
        // ]
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
    };

    deleteAccount = (e) => {
        e.preventDefault(); // tarvitaanko

        // poista firebasesta
        var user = app.auth().currentUser;
        console.log(user.displayName)

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
        }).then(function () {
            console.log("kurssi luotu")

            // lisää kurssi omaan listaan
            var userid = app.auth().currentUser.uid;
            //var userid = user.uid;

            var api = '/api/users/addcourse/';
            return fetch(api + userid, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courseName: newCourseName
                })
            });
        })
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
        console.log("käyttäjät haettu UUDESTAAN");
    };


    toggleUserRights = (e) => {
        // anna REST:in kautta käyttäjälle admin oikeudet TAI muuta takaisin studentiksi

        e.preventDefault();
        const userToBeModified = e.target.elements.selectedUser.value;
        console.log("tätä käyttäjää muokataan " + userToBeModified);

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


        //************* POISTETAAN JOS SAADAAN STATEEN/PROPSIIN KURSSILISTA! *******//

        // this.setState({
        //     user: app.auth().currentUser.uid
        // });

        /*
        this.getUserCoursesFromSQL(function (courses) {
            this.setState(
                {courses: courses}
            );
            console.log("käyttähän kurssit haettu");
        }.bind(this))
        */

        //************* POISTETAAN JOS SAADAAN STATEEN/PROPSIIN KURSSILISTA! *******//

    }

    componentWillUpdate() {
        console.log("componentWillUpdate");

    }

    render() {
        console.log(this.props.username)
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
                        <h2>Profile information</h2>
                        <h4>Username: {this.state.username}</h4>
                        <h4>User role: {this.state.userRole}</h4>
                    </div>
                    <div>
                        <h3>Your courses</h3>
                        <div>
                            {courseList}
                        </div>

                    </div>
                    <div>
                        <h3>Delete your account
                            <button className="glyphicon glyphicon-trash trash"
                                    onClick={this.deleteAccount}/></h3>
                    </div>

                    {/*ADMIN*/}
                    <div>
                        <h3>Administrator</h3>
                    </div>
                    <div>
                        <h4>Create a new course</h4>
                        <form onSubmit={this.createANewCourse}>
                            <input className="form-control center-block input-customs stylish" type="text"
                                   name="newCourseName"
                                   placeholder="Name of new course..."/></form>
                        <button className="glyphicon glyphicon-plus add"/>
                    </div>

                    <div>
                        <h4>Give teacher rights to student</h4>
                        <form className="default" onSubmit={this.toggleUserRights}>
                            {/*<p>Select course</p>*/}
                            {/*<select name="courseDropdown">*/}
                            {/*{this.state.countryData.map((e, key) => {*/}
                            {/*return <option key={key} value={e.courseId}>{e.courseName}</option>;*/}
                            {/*})}*/}
                            {/*</select>*/}
                            <select name="selectedUser">
                                {this.state.userlist.map((e, key) => {
                                    if (e.userRole === "student") {
                                        return <option key={key} value={e.firebaseUserId}>{e.username}</option>
                                    }
                                })}
                            </select>
                            <button className="glyphicon glyphicon-plus add"/>
                        </form>
                        <h4>Give student rights to teacher</h4>
                        <form className="default" onSubmit={this.toggleUserRights}>
                            {/*<p>Select course</p>*/}
                            {/*<select name="courseDropdown">*/}
                            {/*{this.state.countryData.map((e, key) => {*/}
                            {/*return <option key={key} value={e.courseId}>{e.courseName}</option>;*/}
                            {/*})}*/}
                            {/*</select>*/}
                            <select name="selectedUser">
                                {this.state.userlist.map((e, key) => {
                                    if (e.userRole === "teacher") {
                                        return <option key={key} value={e.firebaseUserId}>{e.username}</option>
                                    }
                                })}
                            </select>
                            <button className="glyphicon glyphicon-plus add"/>
                        </form>

                    </div>
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
                <h4>{this.props.coursename}  <button className="glyphicon glyphicon-trash trash" onClick={this.removeCourse}> </button>
                </h4>
            </div>
        )
    };
}

export {Course};