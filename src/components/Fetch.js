function fetchTickets(callback, courseId){
    var api = 'api/tickets/';
    var cId = courseId ? courseId : 1;
    fetch(api+cId)
        .then(function(response) {
            return response.json();})
        .then(function(tickets) {
            callback(tickets)
        });
}

function fetchUserInfoFromMysql(callback, fbuid) {
    var api = '/api/users/'
    var id = fbuid;
    console.log("fetchUserInfoFromMysql: ")
    console.log(api + id)
    fetch(api + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (users) {
            callback(users)
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

export {fetchTickets, fetchCourses, fetchUserInfoFromMysql};

