function fetchTickets(callback, courseId) {
    var api = 'api/tickets/course/';
    var cId = courseId ? courseId : 'java-kurssi';
    fetch(api + cId)
        .then(function (response) {
            console.log(response);
            if (response.status == 200) {
                console.log('response 200');
                return response.json();
            } else {
                console.log('response 204');
                return null
            }
        })
        .then(function (tickets) {
            callback(tickets)
        });
}

function fetchCourses(callback) {
    fetch('api/courses')
        .then(function (response) {
            return response.json();
        })
        .then(function (courses) {
            callback(courses)
        });
}

export {fetchTickets, fetchCourses};

