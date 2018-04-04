import React, { Component } from 'react';
import './App.css';
import TicketList from "./components/TicketList";
import Title from "./components/Title";
import MyTicket from "./components/MyTicket";
import {fetchTickets} from "./components/Fetch";

class App extends Component {

    state = {data:[]};
    componentDidMount() {
        this.fetchTicketsAndUpdate()
    }

    fetchTicketsAndUpdate = () => {
        fetchTickets(function  (tickets){
            console.log("Tiketit haettu. " + tickets.length)
            this.setState({data:tickets});
        }.bind(this));
    }

     reFetchList = () => {
        this.fetchTicketsAndUpdate();
    }

  render() {
    console.log("App render");

    return (
      <div className="App">
          <Title/>
          <TicketList data={this.state.data}/>
          <MyTicket reFetchList={this.reFetchList} />
      </div>
    );
  }
}

export default App;
