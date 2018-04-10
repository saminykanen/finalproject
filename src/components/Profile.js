import React, {Component} from 'react';
import { Navigation } from './Navigation';
import Title from './Title';
import "./Profile.css";
import {app} from "../components/Authetication/base";

class Profile extends Component {

    render() {

        /*var currentUser = app.auth().currentUser;
        console.log("currentUser " + currentUser);*/

        console.log(this.props.authenticated);

        return (
            <div className="default">
                <Navigation/>
                <Title/>
                <h3>Profile information</h3>
            </div>
        );
        /*}*/
    }

}

export default Profile;