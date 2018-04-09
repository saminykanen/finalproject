import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import './Ticket.css';
import expandbutton from '../images/expandbutton.png';
import expandbutton_vertical from '../images/expandbutton_vertical.png';


class Ticket extends Component {

    render() {
        return (
            <div className="container"  >
                <Panel style={{marginBottom: '10px'}} eventKey={this.props.index+1+''} defaultcollapsed="true" className={this.props.ticket.ticketStatus.startsWith('a') ? "panel panel-success" : "panel-warning"}>
                    <Panel.Heading style={{height: '50px'}}>
                        <Panel.Title toggle className="text-left">
                            <div>
                                <span><b>{this.props.ticket.ticketTitle}</b></span>
                                <span style={{float: 'right'}}><i><small>{this.props.ticket.timestamp.substring(0,10)}</small></i> <i><small>{this.props.ticket.timestamp.substring(11)}</small></i></span>
                                <img src={expandbutton} width="45" height="12" className="center-block"
                                     alt="expandticket"/>
                                </div>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body className="text-left">
                            <br/>
                            <div className="row" >
                                <span className="col-lg-1"><b>Location:</b></span><span className="col-lg-11">{this.props.ticket.location}</span>
                            </div>
                            {/*<div className="row">*/}
                                {/*<span className="col-md-1"><b>Date&Time:</b></span><span className="col-md-11">{this.props.ticket.timestamp}</span>*/}
                            {/*</div>*/}
                            <div className="row">
                                <span className="col-lg-1"><b>Description:</b></span><span className="col-lg-11">{this.props.ticket.ticketDescription}</span>
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
                                <br/>
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