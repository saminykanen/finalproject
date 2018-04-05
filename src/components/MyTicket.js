import React, {Component} from 'react';
import TicketForm from "./TicketForm";
import './MyTicket.css';
import {Modal} from "react-bootstrap";

class MyTicket extends Component {

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render(){
        return (
            <div className="App">
                <button className="btn btn-info button button1" onClick={this.toggleModal}>
                    <i className="plus">+</i>
                    <span className="button-text">TICKET!</span>
                </button>
                <Modal show={this.state.isOpen}>
                    <TicketForm reFetchList={this.props.reFetchList} onClose={this.toggleModal}/>
                </Modal>
            </div>
        );
    }
    //     return(
    //         <Router>
    //         <div className="col-xs-3 col-sm-3">
    //                 <div>
    //                     <Switch>
    //                         <Route exact path="/addticket" render={props => <TicketForm reFetchList={this.props.reFetchList}/>}/>
    //                     </Switch>
    //                 </div>
    //             <Link className="link" to="/addticket" >
    //                 <button className="button button1">
    //                     <i className="plus">+</i>
    //                     <span className="button-text">Create new ticket</span>
    //                 </button>
    //             </Link>
    //            {/*<TicketForm reFetchList={this.props.reFetchList}/>*/}
    //            {/*<TicketForm addNew = {this.addNewTicket}/>*/}
    //         </div>
    //         </Router>
    //     )
    // }
}
export default MyTicket;