import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import {ticketJson} from './TicketList';

class MyTicket extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state= {tickets: ticketJson};
    }

    addNewTicket = (e) => {
        this.state.tickets.push(e);
    }

    render(){
        return(
            <div className="container">
                <span>MyTicket</span>
                <TicketForm addNew = {this.addNewTicket}/>
            </div>
        )
    }
}
export default MyTicket;