import React, {Component} from 'react';
import Ticket from "./Ticket";
import {PanelGroup} from 'react-bootstrap';
import './TicketList.css'


class TicketList extends Component {

    render() {
        var tickets = '';
        console.log("TicketList render" + this.props.data.length);
        if (this.props.data.map != null) {
            tickets = this.props.data.map(function (ticket, index) {
                return (
                    <Ticket index={index} ticket={ticket} key={ticket.ticketId} reFetchList={this.props.reFetchList} username={this.props.username}/>);
            }.bind(this));
        } else {
            return (
                <div className="container">
                    <h4 className="blockquote">Could not load tickets.</h4>
                </div>
            );
        }

        return (
            <div>
                <h4>Amount of active tickets: <span className="badge">{tickets.length}</span></h4>
                <div className="wrapper centered style-2" style={{overflow: 'auto', maxHeight: '60%'}}>
                    <PanelGroup accordion>
                        {tickets}
                    </PanelGroup>
                </div>
            </div>
        )
    }
}

export default TicketList;
