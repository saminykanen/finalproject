import React, {Component} from 'react';
import {Navigation} from './Navigation';
import Title from './Title';
import "./Profile.css";
import {app} from "../components/Authetication/base";

class Profile extends Component {

    state = {
        kurssilista: ["Java-kurssi", "React-kurssi", "Pelle-kurssi"]

    };

    // Ei vielä toteutettu deletoimista databasesta
    deleteCourse = (e) => {
        // e = kurssin nimi
        //var ind = this.state.kurssilista.findIndex((i) => i.id === e);
        //this.state.kurssilista.splice(ind, 1); // poista sanonta
        console.log(e);
        //this.setState(this.state);
    };

    deleteAccount = () => {
        // poista firebasesta
        // poista MySQL:stä
    };


    render() {

        // USER

        // tekee listan käyttäjän omista kursseista
        var deleteCourse = this.deleteCourse;
        var courseList = this.state.kurssilista.map(
            function (course, index) {
                return (
                    <Course coursename={course} key={index} deleteCourse={deleteCourse}/>
                );
            });

        // ADMIN


        return (
            <div className="default" style={{marginTop: '40px'}}>
                <Navigation/>
                <Title/>
                <div>
                    <h3>Profile information</h3>
                    <p>Username: [Hessu Hopo]</p>
                    <p>User role: [Teacher / student]</p>
                </div>
                <div>
                    <h4>Your courses</h4>
                    <div>
                        {courseList}
                    </div>

                </div>
                <div>
                    <h4>Delete your account</h4>
                    <button className="btn btn-info btn-customs"><i className="glyphicon glyphicon"/> Remove account
                    </button>
                </div>

                {/*ADMIN*/}
                <div>
                    <h3>Administrator</h3>
                </div>
                <div>
                    <h4>Create a new course</h4>
                    <form className="default">
                        <input className="form-control center-block input-customs" type="text" name="kurssiId"
                               placeholder="Name of new course..."/>
                        <button className="btn btn-info btn-customs"><i className="glyphicon glyphicon"/> Create course
                        </button>
                    </form>
                </div>

                <div>
                    <h4>Give user teacher rights</h4>
                    <form className="default">
                        <input className="form-control center-block input-customs" type="text" name="kurssiId"
                               placeholder="find user my email etc."/>
                        <button className="btn btn-info btn-customs"><i className="glyphicon glyphicon-search"/> Search
                        </button>
                    </form>
                </div>

            </div>
        );
        /*}*/
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
                <p>{this.props.coursename} <br/>
                    <button className="btn btn-info btn-customs" onClick={this.removeCourse}><i
                        className="glyphicon glyphicon"/> Remove
                    </button>
                </p>
            </div>
        )
    };
}

export {Course};