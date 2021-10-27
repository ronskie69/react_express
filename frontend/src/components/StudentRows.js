import React, { useState, useCallback } from 'react'
import { combineNames, capitalize } from '../utils/utils'
import ModalDrop from './modals/ModalDrop'
import ModalEdit from './modals/ModalEdit';

function StudentRows({ student, viewStudent }) {


    const [ toggleEdit, setToggleEdit ] = useState(false);
    const [ toggleDrop, setToggleDrop ] = useState(false);

    const toggleModalEdit = useCallback(() => setToggleEdit(!toggleEdit), [toggleEdit]);
    const toggleModalDrop = useCallback(() => setToggleDrop(!toggleDrop), [toggleDrop]);

    const { student_id, fname, lname, school_year } = student

    return (
        <>
            <tr>
                <td>{student_id}</td>
                <td>{fname}</td>
                <td>{lname}</td>
                <td>{school_year}</td>
                <td>
                    <button className="btn btn-success" onClick={() => viewStudent(student_id)}>View</button>
                </td>
                <td className="d-flex">
                    <button className="btn btn-info mr-2" onClick={toggleModalEdit}>Edit</button>
                    <button className="btn btn-danger" onClick={toggleModalDrop}>Drop</button>
                </td>
            </tr>
            {/* modals */}
            <ModalEdit
                toggle={toggleModalEdit} 
                isOpen={toggleEdit}
                student={student}
            />
            <ModalDrop 
                toggle={toggleModalDrop} 
                isOpen={toggleDrop}
                studentName={combineNames(capitalize(fname), capitalize(lname))}
                studentID={student_id}
             />
        </>
    )
}

export default StudentRows
