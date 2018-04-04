import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TicketList from "./components/TicketList";
import Title from "./components/Title";
import MyTicket from "./components/MyTicket";
import TicketForm from "./components/TicketForm";


const App = appProps => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Page}/>
               <Route exact path="/addticket" component={TicketForm}/>
            </Switch>
        </div>
    </Router>
);

/*
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
}*/
export default App;

class Page extends Component {
    render() {
        return(
            <div>
            <Title/>
            <TicketList/>
            <MyTicket/>
            </div>
        );

    }
}
