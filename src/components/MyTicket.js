import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import './MyTicket.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class MyTicket extends Component {

    addNewTicket = (e) => {
        this.state.data.push(e);
    };

    render(){
        return(
            <Router>
            <div className="col-xs-3 col sm-3">
                    <div>
                        <Switch>
                            <Route exact path="/addticket" component={TicketForm}/>
                        </Switch>
                    </div>
                <Link className="link" to="/addticket">
                    <button className="button button1">
                        <i className="plus">+</i>
                        <span className="button-text">Create new ticket</span>
                    </button>
                </Link>
               {/*<TicketForm addNew = {this.addNewTicket}/>*/}
            </div>
            </Router>

        )
    }
}
export default MyTicket;