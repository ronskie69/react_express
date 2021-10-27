import { TYPES } from './types'
import axios from 'axios'

const {
    ADD_STUDENT,
    EDIT_STUDENT,
    GET_STUDENTS,
    DROP_STUDENT,
    VIEW_STUDENT
} = TYPES

export const show_students = () => async dispatch => {
    try {
        const result = await axios.get('http://localhost:3007/');

        console.log(result.data)
        dispatch({
            type: GET_STUDENTS,
            payload: result.data
        });
    } catch (error) {
        console.warn("ERROR IN ACTION - SHOW STUDENTS: ", error);
    }
}

export const view_student = (s_id) => async dispatch => {
    try {
        const result = await axios.get(`http://localhost:3007/${s_id}`);
        console.log("actions", result.data[0])
        dispatch({
            type: VIEW_STUDENT,
            payload: result.data[0]
        });
    } catch (error) {
        console.warn("ERROR IN ACTION - VIEW STUDENT: ", error);
    }
}

export const add_student = (student) => async dispatch => {
    try {
        await axios.post('http://localhost:3007/add', student);
    } catch (error) {
        console.warn("ERROR IN ACTION - ADD STUDENT: ", error);
    }
}

export const edit_student = (st_id, pinalit) => async dispatch => {
    try {
        const result = await axios.put(`http://localhost:3007/${st_id}/edit`, pinalit);
        console.log("actions: edit: ", result.data)
        dispatch({
            type: EDIT_STUDENT,
            payload: {
                id: st_id,
                pinalit: result.data
            }
        });
    } catch (error) {
        console.warn("ERROR IN ACTION - EDIT STUDENT: ", error);
    }
}

export const drop_student = (st_id)  => async dispatch=> {
    try {
        await axios.delete(`http://localhost:3007/${st_id}/drop`);
        dispatch({
            type: DROP_STUDENT,
            payload: st_id
        });
    } catch (error) {
        console.warn("ERROR IN ACTION - DROP STUDENT: ", error);
    }
}


