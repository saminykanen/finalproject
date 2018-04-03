import React, { Component } from 'react';
import './App.css';
import Ticket from "./components/Ticket";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import Title from "./components/Title";
import MyTicket from "./components/MyTicket";


class App extends Component {
  render() {
    return (
      <div className="App">

          <Title/>
          <TicketList/>
          <MyTicket/>




      </div>
    );
  }
}

export default App;
