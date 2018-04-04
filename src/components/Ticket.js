import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import './Ticket.css';


class Ticket extends Component {

    render() {
        return (
            <div className="container">
                <Panel defaultCollapsed className={this.props.ticket.ticketStatus.startsWith('a') ? "panel panel-success" : "defaultticket"}>
                    <Panel.Heading >
                        <Panel.Title toggle className="text-left">
                            <th>{this.props.ticket.ticketTitle}</th>
                            {/*<th style={{float: 'right'}}>{this.props.ticket.user.userName}</th>*/}

                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body className="text-left">
                            <tr>
                                <td>{this.props.ticket.location}</td>
                            </tr>
                            <tr>
                                <td>{this.props.ticket.timestamp}</td>
                            </tr>
                            <tr>
                                <td>{this.props.ticket.ticketDescription}</td>
                            </tr>
                            <tr>
                                <td><button className="btn btn-danger btn-md">DELETE</button></td>
                            </tr>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        )
    }
}

export default Ticket;