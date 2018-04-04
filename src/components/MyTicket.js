import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import './MyTicket.css';
import {Link} from 'react-router-dom';
import {Panel} from 'react-bootstrap';

class MyTicket extends Component {

    addNewTicket = (e) => {
        this.state.data.push(e);
    };

    render(){
        return(
            <div className="col-xs-3 col sm-3">
                {/*<Panel defaultCollapsed>*/}
                <Panel.Heading>
                    <Panel.Title>
                <Link className="link" to="/addticket">
                    <button className="button button1">
                        <i className="plus">+</i>
                        <span className="button-text">Create new ticket</span>
                    </button>
                </Link>
                    </Panel.Title>
            </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                <TicketForm addNew = {this.addNewTicket}/>
                    </Panel.Body>
                </Panel.Collapse>
              {/*  </Panel>*/}
            </div>

        )
    }
}
export default MyTicket;