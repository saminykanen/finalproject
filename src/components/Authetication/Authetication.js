import React, {Component} from 'react';

class Authentication extends Component {

    render() {
        return (
            <div>
                {this.props.authenticated === false ? <p>You are outside the Matrix {this.props.user}</p> : null}
                {this.props.authenticated === true ? <p>Welcome to the Matrix</p> : null}
            </div>
        )
    }
}

export default Authentication;