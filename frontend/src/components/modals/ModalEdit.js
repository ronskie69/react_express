import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { capitalize } from '../../utils/utils';
import { edit_student } from '../../actions/actionStudents'

function ModalEdit({ 
    student,
    isOpen,
    toggle }) {
   

    const [ data, setData ] = useState({
        student_id: student.student_id,
        fname: student.fname,
        lname: student.lname,
        school_year: student.school_year
    });

    const dispatch = useDispatch()

    const submitData = e => {
        e.preventDefault()
        if(data.school_year <= 0 || data.school_year > 4) return;
        dispatch(edit_student(student.st_id, data))
        toggle() // close dialog
    }
    
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader className="bg-dark text-light" toggle={toggle}>Edit {capitalize(student.fname)} {capitalize(student.lname)}</ModalHeader>
            <ModalBody className="bg-dark text-light">
            <form className="form" onSubmit = {submitData}>
                <div className="form-group">
                    <label htmlFor="student_id">Student ID</label>
                    <input 
                        required
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
                        required
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
                        required
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
                        required
                        className="form-control"
                        name="school_year"
                        type="number"
                        placeholder="Enter student's year in college..."
                        value={data.school_year}
                        onChange ={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="d-flex justify-content-between">
                    <input className="btn btn-success" type ="submit" value="Save Changes"/>
                </div>
            </form>
            </ModalBody>
        </Modal>
    )
}

export default ModalEdit
