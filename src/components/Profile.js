import React, {Component} from 'react';
import "./Profile.css";

class Profile extends Component {

    state= {

    }
    render() {
        return(
            <div className="default">
            <h1>Moi</h1>
                <p>username: {this.state.username}</p>
            </div>
        );
    }
}

export default Profile;