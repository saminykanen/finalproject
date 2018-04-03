import React, {Component} from 'react';
import TicketForm from "./TicketForm";

class MyTicket extends Component{
    render(){
        return(
            <div className="container">
                <span>MyTicket</span>
                <TicketForm/>
            </div>
        )
    }
}
export default MyTicket;