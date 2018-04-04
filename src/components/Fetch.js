

function fetchTickets(callback){
    fetch('api/tickets/notpassive')
        .then(function(response) {
            return response.json();})
        .then(function(tickets) {
            // this.setState({data: json});
            // console.log(json);
            callback(tickets)
        });
}

export {fetchTickets};