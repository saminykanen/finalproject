import React, {Component} from 'react';
import { Navigation } from './Navigation';
import Title from './Title';
import "./Profile.css";

class Profile extends Component {

    render() {

        return (
            <div className="default">
                <Navigation />
                <Title />
                <h3>Profile information</h3>
            </div>
        );
    }
}

export default Profile;