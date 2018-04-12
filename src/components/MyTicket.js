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

    showAddNewTicket(userInfo){
        if(userInfo === 'student'){
            return(
                <button className="btn button button1 buttonStyle" onClick={this.toggleModal}>
                    <i className="plus">+</i>
                    <span className="button-text">TICKET!</span>
                </button>
            )
        }else{
            return(null)
        }
    }

    render(){
        return (
            <div className="container">
                {this.showAddNewTicket(this.props.userRole)}
                <Modal show={this.state.isOpen}>
                    <TicketForm reFetchList={this.props.reFetchList} onClose={this.toggleModal} firebaseUserId={this.props.firebaseUserId} username={this.props.username} courseId={this.props.courseId}/>
                </Modal>
            </div>
        );
    }
}
export default MyTicket;