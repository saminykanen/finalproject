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
                    <input type="text" value={this.state.ticketowner} onChange={this.handleInputChange} placeholder={"Owner"}/> <br/>
                    <input type="text" value={this.state.tickettitle} onChange={this.handleInputChange} placeholder={"Title"}/><br/>
                    <input type="text" value={this.state.ticketdescription} onChange={this.handleInputChange} placeholder={"Description"}/><br/>
                    <input type="text" value={this.state.location} onChange={this.handleInputChange} placeholder={"Location"}/><br/>
                    <input type="submit" value="Add ticket"/>
                </form>
            </div>
        )
    }
}
export default TicketForm;
