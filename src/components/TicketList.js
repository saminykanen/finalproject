import React, {Component} from 'react';
import Ticket from "./Ticket";

class TicketList extends Component{
    render(){
        return(
            <div className="container">
                <span>TicketList</span>
                <Ticket/>
            </div>
        )
    }
}
export default TicketList;
