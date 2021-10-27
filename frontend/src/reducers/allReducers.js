import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import gradeReducer from "./gradesReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
    students: studentReducer,
    grades: gradeReducer,
    users: userReducer
})

export default allReducers