import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//actions
import { show_students } from '../actions/actionStudents';
//components
import StudentRows from './StudentRows';

function Homepage({ history }) {

    const students = useSelector(state => state.students)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(show_students());
    }, [dispatch]);

    const viewStudentBtn = (student_id) => {
        return history.push(`/view/${student_id}`)
    }
    
    return (
        <div className="container">
            <h1 className="text-center mt-4">My Students</h1>
            <button className="btn btn-primary float-right mb-2" onClick={() => history.push('/add-student')}>Add New Student</button>
            <div className="clearfix"></div>
            <table className="table text-center table-responsive table-striped table-hover table-dark">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>School Year</th>
                        <th>Grades</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.length > 0 ?
                        students.map(student => {
                            return <StudentRows 
                                student = {student} 
                                viewStudent = {viewStudentBtn}
                                key ={student.st_id}/>
                        })
                        :
                        <tr>
                            <td colSpan="6">No students...</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Homepage
