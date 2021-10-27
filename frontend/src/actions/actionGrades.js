import axios from "axios";
import { TYPES } from "./types";

const {
    GET_GRADES,
} = TYPES

export const edit_grade = (grades) => async dispatch => {
    try {
        await axios.post('http://localhost:3007/grades/post', grades);
    } catch (error) {
        console.warn("ERROR IN ACTION - EDIT GRADES: ", error);
    }
}

export const update_grade = (newGrades) => async dispatch => {
    try {
        await axios.put(`http://localhost:3007/grades/update`, newGrades);
    } catch (error) {
        console.warn("ERROR IN ACTION - UPDATE GRADES: ", error);
    }
}

export const get_grade = (student_id) => async dispatch => {
    try {
        const result = await axios.get(`http://localhost:3007/grades/${student_id}`);

        console.log("actions: get: ", result.data)
        dispatch({
            type: GET_GRADES,
            payload: result.data
        });
    } catch (error) {
        console.warn("ERROR IN ACTION - EDIT GRADES: ", error);
    }
}