import React, {Component} from 'react';
import Ticket from "./Ticket";
import {PanelGroup} from 'react-bootstrap';
import './TicketList.css'
import '../App.css';
import notickets from '../images/notickets.png';


class TicketList extends Component {

    render() {
        var tickets = '';
        // console.log("TicketList render" + this.props.data.length);
        if (this.props.data != null) {
            tickets = this.props.data.map(function (ticket, index) {
                return (
                    <Ticket index={index} ticket={ticket} key={ticket.ticketId} reFetchList={this.props.reFetchList} username={this.props.username} userRole={this.props.userRole}/>);
            }.bind(this));
        } else {
            return (
                <div className="container">
                    <img className="img img-responsive centered" src={notickets}/>
                </div>
            );
        }

        return (
            <div className="default">
                <h4>Amount of active tickets: <span className="badge">{tickets.length}</span></h4>
                <div className="wrapper centered style-2 smaller2 scroller">
                    <PanelGroup accordion>
                        {tickets}
                    </PanelGroup>
                </div>
            </div>
        )
    }
}

export default TicketList;
