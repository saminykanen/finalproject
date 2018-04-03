import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import {ticketJson} from './TicketList';

class MyTicket extends Component {

    constructor(props) {
        super(props);
    }

    addNewTicket = (e) => {
        this.state.data.push(e);
    };

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