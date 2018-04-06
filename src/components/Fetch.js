

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

function fetchCourses(callback){
    fetch('api/courses')
        .then(function(response) {
            return response.json();})
        .then(function(courses) {
            callback(courses)
        });
}

export {fetchTickets, fetchCourses};