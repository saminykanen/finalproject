import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import {ticketJson} from './TicketList';

class MyTicket extends Component {

    constructor(props) {
        super(props);
    }

/*    addNewTicket = (e) => {
        this.state.data.push(e);
    };*/
/*
    reFetchTickets = () => {
        this.props.reFetchList();
    }
*/

    render(){
        return(
            <div className="container">
                <span>MyTicket</span>
                <TicketForm reFetchList={this.props.reFetchList}/>
            </div>
        )
    }
}
export default MyTicket;