import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import './Ticket.css';
import expandbutton from '../images/expandbutton.png';


class Ticket extends Component {

    render() {
        return (
            <div className="container">
                <Panel defaultCollapsed className={this.props.ticket.ticketStatus.startsWith('a') ? "panel panel-success" : "defaultticket"}>
                    <Panel.Heading >
                        <Panel.Title toggle className="text-left">
                            <th>{this.props.ticket.ticketTitle}</th>
                            <th style={{float: 'right'}}>{this.props.ticket.timestamp}</th>
                            <img src={expandbutton} width="45" height="12" className="center-block"/>


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
                                <td><button className="btn btn-danger btn-md" onClick={this.handleChangeToPassive.bind(this)}>DELETE</button></td>
                                <td><button className="btn btn-warning btn-md float-right" onClick={this.handleChangeToActive.bind(this)}>ACTIVATE</button></td>
                            </tr>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        )
    }

    handleChangeToPassive(e) {
        e.preventDefault();
        const API = 'api//tickets/setpassive/';
        const TID = this.props.ticket.ticketId;

        fetch(API+TID,{
            method: 'PUT'
        })
            .then(function () {
                this.props.reFetchList();
            }.bind(this));
    }
        handleChangeToActive(e) {
        e.preventDefault();
        const API = 'api//tickets/setactive/';
        const TID = this.props.ticket.ticketId;

        fetch(API+TID,{
            method: 'PUT'
        })
            .then(function () {
                this.props.reFetchList();
            }.bind(this));
    }

}

export default Ticket;