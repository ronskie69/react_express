import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { drop_student } from '../../actions/actionStudents'

function ModalDrop({ studentName, studentID, isOpen, toggle }) {

    const dispatch = useDispatch()

    const dropStud = () => {
        dispatch(drop_student(studentID))
    }
    
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalBody className="bg-dark text-light">
                <h5>Drop {studentName} from your class?</h5>
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-success" onClick={toggle}>No</button>
                    <button className="btn btn-danger" onClick={dropStud}>Drop Student</button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalDrop
