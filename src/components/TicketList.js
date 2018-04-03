import React, {Component} from 'react';
import Ticket from "./Ticket";
import {Panel} from 'react-bootstrap';
import './TicketList.css'

export const ticketJson = [
    {
        ticketid: 1,
        timestamp: '2018-03-19 11:47:52',
        courseid: 1,
        coursename: 'Java-kurssi',
        tickettitle: 'Ongelma GIT pull:in kanssa',
        ticketdescription: 'Koitin pullata, mutta kävikin push. Pyrin korjaamaan asian force puillilla, mutta tein vahingossa mergen ja sain konfliktin aikaan.',
        ticketstatus: 'active',
        ticketowner: 'Samu',
        location: 'Utö'
    },
    {
        ticketid: 2,
        timestamp: '2018-03-19 11:22:52',
        courseid: 1,
        coursename: 'Java-kurssi',
        tickettitle: 'GIT ei toimi',
        ticketdescription: 'Koitin pullata, mutta kävikin push. Pyrin korjaamaan asian force puillilla, mutta tein vahingossa mergen ja sain konfliktin aikaan.',
        ticketstatus: 'queue',
        ticketowner: 'Pekka',
        location: 'Utö'
    },
    {
        ticketid: 3,
        timestamp: '2018-03-20 11:47:52',
        courseid: 1,
        coursename: 'Java-kurssi',
        tickettitle: 'Mikään ei toimi',
        ticketdescription: 'Koitin pullata, mutta kävikin push. Pyrin korjaamaan asian force puillilla, mutta tein vahingossa mergen ja sain konfliktin aikaan.',
        ticketstatus: 'passive',
        ticketowner: 'Jake',
        location: 'Utö'
    }

]

class TicketList extends Component {

    state = {
        ticketJson
    };

    render() {
        return (
            <div className="container">
                <ul>
                    {this.state.ticketJson.map((ticket, index) =>
                        <Panel defaultCollapsed key={index}>
                            <Panel.Heading>
                                <Panel.Title toggle>
                                    <th className="list-group-item-heading align-left">{ticket.tickettitle}</th>
                                    <th style={{float: 'right'}}>{ticket.ticketowner}</th>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body className="align-left">
                                    <tr>
                                        <td>{ticket.location}</td>
                                    </tr>
                                    <tr>
                                        <td>{ticket.timestamp}</td>
                                    </tr>
                                    <tr>
                                        <td>{ticket.ticketdescription}</td>
                                    </tr>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    )}
                </ul>
            </div>
        )
    }
}

export default TicketList;
