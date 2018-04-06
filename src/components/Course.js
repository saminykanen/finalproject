import React, {Component} from 'react';

class Course extends Component{
    render(){
        return(
            <div className="container">
                <span>{this.props.course.courseName}</span>
            </div>
        )
    }
}
export default Course;