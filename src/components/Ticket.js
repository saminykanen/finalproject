import React, {Component} from 'react';
import {ticketJson} from './TicketList';


class Ticket extends Component {

    state = {
        ticketid: ticketJson.ticketid,
        tickettitle: ticketJson.tickettitle,
        ticketdescription: ticketJson.ticketdescription,
        ticketowner: ticketJson.ticketowner,
        ticketstatus: ticketJson.ticketstatus,
        timestamp: ticketJson.timestamp,
        courseid: ticketJson.courseid,
        location: ticketJson.location
    };


    render() {
        return (
            <div className="container">

                <table>
                    <thead>
                    <tr>
                        <th>{this.state.tickettitle}</th>
                        <th>{this.state.ticketowner}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.location}</td>
                    </tr>
                    <tr>
                        <td>{this.state.timestamp}</td>
                    </tr>
                    <tr>
                        <td>{this.state.ticketdescription}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Ticket;