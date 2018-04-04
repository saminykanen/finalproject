import React, {Component} from 'react';
import Ticket from "./Ticket";
import './TicketList.css'


class TicketList extends Component {

    state = {data:[]};
    componentDidMount() {
        fetch('api/tickets')
            .then(function(response) {return response.json();})
            .then(function(json) {
                this.setState({data: json});
                console.log(json);
            }.bind(this));
    }

    render() {

       /*const ticketJson = [
            {
                ticketid: 1,
                timestamp: '2018-03-19 11:47:52',
                courseid: 1,
                coursename: 'Java-kurssi',
                tickettitle: 'Ongelma GIT pull:in kanssa',
                ticketdescription: 'Koitin pullata, mutta kävikin push. Pyrin korjaamaan asian force puillilla, mutta tein vahingossa mergen ja sain konfliktin aikaan.',
                ticketstatus: 'active',
                ticketowner: 'Samu',
                location: 'Utö'
            },
            {
                ticketid: 2,
                timestamp: '2018-03-19 11:22:52',
                courseid: 1,
                coursename: 'Java-kurssi',
                tickettitle: 'GIT ei toimi',
                ticketdescription: 'Koitin pullata, mutta kävikin push. Pyrin korjaamaan asian force puillilla, mutta tein vahingossa mergen ja sain konfliktin aikaan.',
                ticketstatus: 'queue',
                ticketowner: 'Pekka',
                location: 'Utö'
            },
            {
                ticketid: 3,
                timestamp: '2018-03-20 11:47:52',
                courseid: 1,
                coursename: 'Java-kurssi',
                tickettitle: 'Mikään ei toimi',
                ticketdescription: 'Koitin pullata, mutta kävikin push. Pyrin korjaamaan asian force puillilla, mutta tein vahingossa mergen ja sain konfliktin aikaan.',
                ticketstatus: 'passive',
                ticketowner: 'Jake',
                location: 'Utö'
            }
            ];*/

        const tickets = this.state.data.map(function(ticket){
            return (<Ticket ticket = {ticket} key={ticket.ticketId}/>);
        });

        return (
            <div className="container">
                <h4>Ticket count: <span className="badge">{tickets.length}</span></h4>
                <div>
                    {tickets}
                </div>
            </div>
        )
    }
}

export default TicketList;
