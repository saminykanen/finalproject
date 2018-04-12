import React, {Component} from 'react';
import './TicketForm.css';


class TicketForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketTitle: '',
            ticketDescription: '',
            userName: '',
            ticketStatus: 'queue',
            timestamp: '',
            courseName: '', // pitää muokata dymaamiseksi,
            // courseId: '',
            location: ''

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitting = this.handleSubmitting.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value})
    }

    //Posting a ticket to the database
    handleSubmitting(e) {
        e.preventDefault();
        console.log("firebaseID " + this.props.firebaseUserId);
        console.log("courseName" +  this.props.courseId);
        const self = this;
        fetch('/api/tickets/createticket/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    ticket: {
                        ticketTitle: self.state.ticketTitle,
                        ticketDescription: self.state.ticketDescription,
                        location: self.state.location
                    },
                    user: {
                        firebaseUserId: this.props.firebaseUserId,
                        userName: this.props.username
                    },
                    course: {
                        courseName: this.props.courseId
                    }
                })
        })
            .then(function () {
                this.props.onClose();
                this.setState({ticketTitle: '', ticketDescription: '', location: ''});
                this.props.reFetchList(this.props.courseId);
            }.bind(this));

    }

    render() {
        return (
            <div className="formi">
                <h1 style={{fontFamily: 'Pacifico, cursive'}}>Add new ticket</h1>
                <form onSubmit={this.handleSubmitting}>
                    <div className="form-group">
                        <input name="ticketTitle"
                               type="text"
                               required="required"
                               className="form-control"
                               value={this.state.ticketTitle}
                               onChange={this.handleInputChange}
                               placeholder={"Title"}/>
                    </div>
                    <div className="form-group">
                        <textarea name="ticketDescription"
                                  rows="5"
                                  className="form-control"
                                  value={this.state.ticketDescription}
                                  onChange={this.handleInputChange}
                                  placeholder={"Description"}/>
                    </div>
                    <div className="form-group">

                        <input name="location"
                               type="text"
                               required="required"
                               className="form-control"
                               value={this.state.location}
                               onChange={this.handleInputChange}
                               placeholder={"Location"}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg buttonStyle">Add ticket</button>
                </form>
                <button type="close" className="btn btn-danger btn-lg" style={{marginTop: '5px'}}
                        onClick={this.props.onClose}>Cancel
                </button>
            </div>
        )
    }
}

export default TicketForm;
