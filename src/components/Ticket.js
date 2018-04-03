import React, {Component} from 'react';
import {ticketJson} from './TicketList';
import {Panel} from 'react-bootstrap';


class Ticket extends Component {

    render() {
        return (
            <div className="container">
                <Panel defaultCollapsed>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            <th className="list-group-item-heading align-left">{this.props.ticket.tickettitle}</th>
                            <th style={{float: 'right'}}>{this.props.ticket.ticketowner}</th>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body className="align-left">
                            <tr>
                                <td>{this.props.ticket.location}</td>
                            </tr>
                            <tr>
                                <td>{this.props.ticket.timestamp}</td>
                            </tr>
                            <tr>
                                <td>{this.props.ticket.ticketdescription}</td>
                            </tr>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        )
    }
}

export default Ticket;