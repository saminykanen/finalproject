import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import {ticketJson} from './TicketList';

class MyTicket extends Component {
    state = {data:[]};
    componentDidMount() {
        fetch('api/tickets')
            .then(function(response) {return response.json();})
            .then(function(json) {
                this.setState({data: json});
            }.bind(this));
        console.log("data tuli");
    }

    constructor(props) {
        super(props);

/*        this.state= {tickets: data};*/
    }

    addNewTicket = (e) => {
        this.state.data.push(e);
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