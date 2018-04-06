import React, {Component} from 'react';
import {fetchCourseTickets} from "./Fetch";

class Course extends Component{
    render(){
        return(
            <div className="container">
                <button className="btn btn-info" onClick={this.props.reFetchList(this.props.course.courseId)}>{this.props.course.courseName}</button>
            </div>
        )
    }
}
export default Course;