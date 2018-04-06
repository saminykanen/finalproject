import React, {Component} from 'react';
import Ticket from "./Ticket";
import './TicketList.css'


class TicketList extends Component {

    render() {
        var tickets = '';
       console.log("TicketList render" + this.props.data.length);
       if (this.props.data.map != null) {
           tickets = this.props.data.map(function (ticket) {
               return (<Ticket ticket={ticket} key={ticket.ticketId} reFetchList={this.props.reFetchList}/>);
           }.bind(this));
       }else{
           return(
               <div className="container">
                   <h4 className="blockquote">Could not load tickets.</h4>
               </div>
           );
       }

        return (
            <div className="container">
                <h4>Ticket count: <span className="badge">{tickets.length}</span></h4>
                <div style={{paddingLeft: '0px', paddingRight:'30px'}}>
                    {tickets}
                </div>
            </div>
        )
    }
}

export default TicketList;
