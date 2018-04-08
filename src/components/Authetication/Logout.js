import React, {Component} from 'react';
import {app} from "./base";


class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        app.auth().signOut()
            .then((user) => {
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <div>
                Loging out..
            </div>
        )
    }
}

export default Logout;