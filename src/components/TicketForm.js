import React, {Component} from 'react';
import {ticketJson, fetchTicketsAndUpdate} from "./TicketList";
import './TicketForm.css';
import TicketList from "./TicketList";


class TicketForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketTitle: '',
            ticketDescription: '',
            userName: '', //tuleeko tähän se kirjautunut?
            ticketStatus: 'queue',
            timestamp: '', //tähän joku localdate now?
            courseName: "Java-kurssi", // pitää muokata dymaamiseksi,
            courseId: '',
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

    handleSubmitting(e) {
        e.preventDefault();
        console.log("firebaseID " + this.props.firebaseUserId);
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
                        firebaseUserId: this.props.firebaseUserId
                    },
                    course:{
                        courseName: this.props.courseId
                    }
                })

        })
            .then(function (body) {
                console.log(body);
                this.setState({ticketTitle: '', ticketDescription: '', location: ''});
                this.props.reFetchList();
            }.bind(this));
        /*        this.props.addNew(this.state);
                this.setState({
                        ticketTitle: '',
                        ticketDescription: '',
                        userName: '', //tuleeko tähän se kirjautunut?
                        ticketStatus: 'queue',
                        timestamp: '', //tähän joku localdate now?
                        courseId: '', //tämäkin automatic?
                        location: ''
                    });*/
    }

    render() {
        return (
            <div className="formi">
                <h1>Add new ticket</h1>
                <form onSubmit={this.handleSubmitting}>
                    {/*<input name="userName" type="text" value={this.state.userName} onChange={this.handleInputChange} placeholder={"Owner"}/> <br/>*/}
                    <div className="form-group">
                        <input name="ticketTitle"
                               type="text"
                               className="form-control"
                               value={this.state.ticketTitle}
                               onChange={this.handleInputChange}
                               placeholder={"Title"}/>
                    </div>
                    <div className="form-group">
                        <input name="ticketDescription"
                               type="text"
                               class="form-control"
                               value={this.state.ticketDescription}
                               onChange={this.handleInputChange}
                               placeholder={"Description"}/>
                    </div>
                    <div className="form-group">
                        <input name="location"
                               type="text"
                               className="form-control"
                               value={this.state.location}
                               onChange={this.handleInputChange}
                               placeholder={"Location"}/>
                    </div>
                    <button type="submit"
                            className="btn btn-primary">Add ticket
                    </button>
                </form>
            </div>
        )
    }
}

export default TicketForm;
