function fetchTickets(callback) {
    fetch('api/tickets/notpassive')
        .then(function (response) {
            return response.json();
        })
        .then(function (tickets) {
            // this.setState({data: json});
            // console.log(json);
            callback(tickets)
        });
}

function fetchUserInfoFromMysql(callback, fbuid) {
    var api = '/api/users/'
    var id = fbuid;
    console.log("fetchUserInfoFromMysql: ")
    console.log(api + id)
    //console.log('/api/users/' + fbuid);
    fetch(api + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (users) {
            callback(users)
        });
}

export {fetchTickets, fetchUserInfoFromMysql};