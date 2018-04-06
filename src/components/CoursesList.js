import React, {Component} from 'react';
import Course from "./Course";

class CoursesList extends Component{
    render(){
        var courses = '';
        console.log("CourseList render" + this.props.coursesData.length);
        if (this.props.coursesData.map != null) {
            courses = this.props.coursesData.map(function (course, index) {
                return (<Course index={index} course={course} key={course.courseId} reFetchCourses={this.reFetchCourses}/>);
            }.bind(this));
        }else{
            return(
                <div className="container">
                    <h4 className="blockquote">Could not load tickets.</h4>
                </div>
            );
        }

        return(
            <div className="wrapper">
                {courses}
            </div>
        )
    }
}
export default CoursesList;