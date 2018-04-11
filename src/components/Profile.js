import React, {Component} from 'react';
import {Navigation} from './Navigation';
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
        kurssilista: ["Java-kurssi", "React-kurssi", "Pelle-kurssi"]
    }

    deleteCourse = (e) => {
        var ind = this.state.kurssilista.findIndex((i) => i.id === e);
        this.state.kurssilista.splice(ind, 1); // poista sanonta
        this.setState(this.state);
    }

    render() {

        /*var currentUser = app.auth().currentUser;
        console.log("currentUser " + currentUser);*/

        var courseList = this.state.kurssilista.map(function (course, index) {
            return (<Course coursename={course} key={index}/>);
        })


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
        //  e.preventDefault();
        this.props.removeCourseFromList(this.props.coursename);
    };

    render() {
        return (
            <div>
                <p>{this.props.coursename} <br/>
                    <button className="btn btn-info btn-customs" onClick={this.removeCourse} ><i className="glyphicon glyphicon" /> Remove</button>
                </p>
            </div>
        )
    };
}

export {Course};