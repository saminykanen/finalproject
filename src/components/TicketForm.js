import React, {Component} from 'react';
import {ticketJson} from "./TicketList";

class TicketForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickettitle: '',
            ticketdescription: '',
            ticketowner: '', //tuleeko tähän se kirjautunut?
            ticketstatus: 'queue',
            timestamp: '', //tähän joku localdate now?
            courseid: '', //tämäkin automatic?
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
        this.props.addNew(this.state);
        this.setState({
                tickettitle: '',
                ticketdescription: '',
                ticketowner: '', //tuleeko tähän se kirjautunut?
                ticketstatus: 'queue',
                timestamp: '', //tähän joku localdate now?
                courseid: '', //tämäkin automatic?
                location: ''
            });
    }


    render(){
        return(
            <div>
                <h1>Add new ticket</h1>
                <form onSubmit={this.handleSubmitting}>
                    <input name="ticketOwner" type="text" value={this.state.ticketOwner} onChange={this.handleInputChange} placeholder={"Owner"}/> <br/>
                    <input name="ticketTitle" type="text" value={this.state.ticketTitle} onChange={this.handleInputChange} placeholder={"Title"}/><br/>
                    <input name="ticketDescription" type="text" value={this.state.ticketDescription} onChange={this.handleInputChange} placeholder={"Description"}/><br/>
                    <input name="location" type="text" value={this.state.location} onChange={this.handleInputChange} placeholder={"Location"}/><br/>
                    <input type="submit" value="Add ticket"/>
                </form>
            </div>
        )
    }
}
export default TicketForm;
