import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

function ModalGrades({ 
    toggle, 
    isOpen, 
    studentName, 
    submitGrade,
    studentID, 
    }) {


    const [ grade, setGrade ] = React.useState({
        grade_id: studentID && studentID,
        prelims: 0,
        midterms: 0,
        finals: 0
    });

    const submitGrades = e => {
        e.preventDefault()
        submitGrade(grade)
        toggle()
    }
    
    return (
        <Modal isOpen = {isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle} className="bg-dark text-light">
                Edit Grades of {studentName}
            </ModalHeader>
            <ModalBody className="bg-dark text-light">
            <form className="form" onSubmit = {submitGrades}>
                <div className="form-group">
                    <label htmlFor="student_id">Prelims Grade</label>
                    <input 
                        type="number"
                        className="form-control"
                        name="prelims"
                        placeholder="Enter prelims grade... (ex. 59)"
                        value = {grade.prelims}
                        onChange ={(e) => setGrade({ ...grade, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="fname">Midterms Grade</label>
                    <input 
                        className="form-control"
                        name="midterms"
                        type="number"
                        placeholder="Enter midterms grade...(ex. 59)"
                        value={grade.midterms}
                        onChange ={(e) => setGrade({ ...grade, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="lname">Finals Grade</label>
                    <input 
                        className="form-control"
                        name="finals"
                        type="number"
                        placeholder="Enter finals grade (ex. 59)..."
                        value={grade.finals}
                        onChange ={(e) => setGrade({ ...grade, [e.target.name]: e.target.value })}
                     />
                </div>
                <div className="d-flex justify-content-between">
                    <input className="btn btn-success" type ="submit" value="Save Grades"/>
                </div>
            </form>
            </ModalBody>
        </Modal>
    )
}

export default ModalGrades
