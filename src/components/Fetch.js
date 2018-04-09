function fetchTickets(callback, courseId){
    var api = 'api/tickets/course/';
    var cId = courseId ? 'Java-kurssi' : 'Java-kurssi';
    fetch(api+cId)
        .then(function(response) {
          return response.json();})
        .then(function(tickets) {
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

