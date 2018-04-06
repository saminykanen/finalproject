import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import './Ticket.css';
import expandbutton from '../images/expandbutton.png';
import PanelGroup from "react-bootstrap/es/PanelGroup";


class Ticket extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            activeKey: '1'
        };
    }

    handleSelect(activeKey) {
        this.setState({activeKey});
    }

    render() {
        return (
            <div className="container">
                <PanelGroup accordion
                            id="accordion-controlled-example"
                            activeKey={this.state.activeKey}
                            onSelect={this.handleSelect}>
                    <Panel eventKey="1" defaultcollapsed="true"
                           className={this.props.ticket.ticketStatus.startsWith('a') ? "panel panel-success" : "defaultticket"}>
                        <Panel.Heading>
                            <Panel.Title toggle className="text-left">
                                <div>
                                    <span><b>{this.props.ticket.ticketTitle}</b></span>
                                    <span style={{float: 'right'}}>{this.props.ticket.timestamp}</span>
                                    <img src={expandbutton} width="45" height="12" className="center-block"
                                         alt="expandticket"/>
                                </div>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body collapsible className="text-left">
                                <div className="row">
                                    <span className="col-md-1"><b>Location:</b></span><span
                                    className="col-md-11">{this.props.ticket.location}</span>
                                </div>
                                <div className="row">
                                    <span className="col-md-1"><b>Date&Time:</b></span><span
                                    className="col-md-11">{this.props.ticket.timestamp}</span>
                                </div>
                                <div className="row">
                                    <span className="col-md-1"><b>Description:</b></span><span
                                    className="col-md-11">{this.props.ticket.ticketDescription}</span>
                                </div>
                                <br/>
                                <div>
                                <span>
                                    <button className="btn btn-danger btn-md" style={{marginRight: '10px'}}
                                            onClick={this.handleChangeToPassive.bind(this)}>DELETE
                                    </button>
                                </span>
                                    <span>
                                    <button className="btn btn-warning btn-md float-right"
                                            onClick={this.handleChangeToActive.bind(this)}>ACTIVATE
                                    </button>
                                </span>
                                </div>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </PanelGroup>
            </div>
        )
    }

    handleChangeToPassive(e) {
        e.preventDefault();
        const API = 'api//tickets/setpassive/';
        const TID = this.props.ticket.ticketId;

        fetch(API + TID, {
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

        fetch(API + TID, {
            method: 'PUT'
        })
            .then(function () {
                this.props.reFetchList();
            }.bind(this));
    }

}

export default Ticket;