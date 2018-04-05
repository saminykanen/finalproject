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
            courseId: '', //tämäkin automatic?
            location: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitting = this.handleSubmitting.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name] : value})
    }

    handleSubmitting(e) {
        e.preventDefault();
        const self = this;
        fetch('/api/tickets/createticket/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                ticketTitle: self.state.ticketTitle,
                ticketDescription: self.state.ticketDescription,
                location: self.state.location,
                userName: "testi"
            })
        })
            .then(function () {
                this.props.onClose();
                this.setState({ticketTitle: '', ticketDescription: '', location: ''});
                this.props.reFetchList();
            }.bind(this));
    }

    render(){
        return(
            <div className="formi">
                <h1>Add new ticket</h1>
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
                           className="form-control"
                           value={this.state.location}
                           onChange={this.handleInputChange}
                           placeholder={"Location"}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-md">Add ticket</button>
                </form>
                <button type="close" className="btn btn-danger btn-md" style={{marginTop: '5px'}} onClick={this.props.onClose}>Close</button>
            </div>
        )
    }
}
export default TicketForm;
