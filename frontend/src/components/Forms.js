import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add_student } from '../actions/actionStudents';

function Forms({ history }) {

    const [ data, setData ] = useState({
        student_id: '',
        fname: '',
        lname: '',
        school_year: 1
    });

    const dispatch = useDispatch()

    const submitData = (e) => {
        e.preventDefault()
        if(data.student_id !== "" 
        && data.fname !== ""
         && data.lname !== "" 
         && data.school_year > 0){
             dispatch(add_student(data))
             history.push('/students')
         }
         return;
    }

    return (
        <div className="container">
            <h3 className="mt-4 mb-4">Add New Student</h3>
            <form className="form" onSubmit = {submitData}>
                <div className="form-group">
                    <label htmlFor="student_id">Student ID</label>
                    <input 
                        className="form-control"
                        name="student_id"
                        placeholder="Enter student ID as indicated in school ID..."
                        value = {data.student_id}
                        onChange ={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input 
                        className="form-control"
                        name="fname"
                        placeholder="Enter student first name..."
                        value={data.fname}
                        onChange ={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input 
                        className="form-control"
                        name="lname"
                        placeholder="Enter student last name or surname..."
                        value={data.lname}
                        onChange ={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="school_year">School Year</label>
                    <input 
                        className="form-control"
                        name="school_year"
                        type="number"
                        placeholder="Enter student's year in college..."
                        value={data.school_year}
                        onChange ={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="d-flex justify-content-between">
                    <input className="btn btn-danger" onClick={() => history.push('/students')} value = "Cancel" type="reset" />
                    <input className="btn btn-success" type ="submit"/>
                </div>
            </form>
        </div>
    )
}

export default Forms
