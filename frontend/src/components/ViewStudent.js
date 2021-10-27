import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
//components
import ModalGrades from './modals/ModalGrades'
import { combineNames } from '../utils/utils';
import { view_student } from '../actions/actionStudents'
import { get_grade, edit_grade, update_grade } from '../actions/actionGrades';

function ViewStudent({ match, history }) {

    const [ showModal, setShowModal ] = useState(false);
    const [ typeDp, setTypeDp ] = useState("edit")
    const student = useSelector(state => state.students);
    const grades = useSelector(state => state.grades);
    const dispatch = useDispatch()

    const toggleModal = useCallback(() => setShowModal(!showModal), [showModal]);

    useEffect(() => {
        dispatch(view_student(match.params.studentID))
    },[dispatch]);


    useEffect(() => {
        dispatch(get_grade(match.params.studentID));
    },[dispatch]);

    useEffect(() => {
        if(_.isEmpty(grades)){
            setTypeDp("edit")
        } else {
            setTypeDp("update")
        }
    }, [grades])

    const submitGrade = (grade) => {
        if(typeDp==="edit"){
            dispatch(edit_grade(grade))
            history.push('/students');
        } 
        if(typeDp==="update"){
            dispatch(update_grade(grade))
            history.push('/students');
        }
    }

    const getStudentData = () => {
        if(!_.isEmpty(student)){
            return (
                <Card color="dark" className="text-light mt-4">
                    <CardHeader>
                        <CardTitle>Student Details</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>Full Name: &nbsp;<span className="lead text-success" >{student.fname} {student.lname}</span></CardText>
                        <CardText>School ID: <span className="lead text-success">{student.student_id}</span></CardText>
                        <CardText>School Year: <span className="lead text-success">{student.school_year}</span></CardText>
                    </CardBody>
                </Card>
            )
        } else {
            return (
                <h4>Data is not available...</h4>
            )
        }
    }

    return (
        <div className="container">
            {getStudentData()}
            <Card color="dark" className="text-light mt-4">
                <CardHeader>
                    <CardTitle>
                        Student Grades 
                        <button className="btn btn-sm btn-danger float-right" onClick={toggleModal}>{ typeDp === "edit" ? "Edit" : "Update"}</button>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>Prelims: &nbsp; <span className="lead text-danger">{grades.prelims ? grades.prelims : "Not Set"}</span></CardText>
                    <CardText>Midterms: &nbsp; <span className="lead text-danger">{grades.midterms ? grades.midterms : "Not Set"}</span></CardText>
                    <CardText>Finals: &nbsp; <span className="lead text-danger">{grades.finals ? grades.finals : "Not Set"}</span></CardText>
                    <CardText>General Weighted Average (GWA): &nbsp; <span className="lead text-danger">{grades.average ? grades.average : "Not Calculated"}</span></CardText>
                </CardBody>
            </Card>
            <button className="btn btn-primary float-right mt-3  mb-4" 
            onClick={() => { history.push('/students')}}>Return to Homepage</button>
            {/* modals */}
            <ModalGrades 
                isOpen = {showModal} 
                toggle = {toggleModal} 
                submitGrade={submitGrade}
                studentID={match.params.studentID}
                studentName ={combineNames(student.fname, student.lname)}/>
        </div>
    )
}

export default ViewStudent
