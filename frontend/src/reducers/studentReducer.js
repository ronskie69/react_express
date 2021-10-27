import { TYPES } from '../actions/types'

const {
    // ADD_STUDENT,
    EDIT_STUDENT,
    GET_STUDENTS,
    DROP_STUDENT,
    VIEW_STUDENT
} = TYPES

const defaultState = [
    {
        st_id: Date.now(),
        student_id: Date.now(),
        fname: 'Karl',
        lname: 'Sunogan',
        school_year: 4
    }
]

function studentReducer(state = defaultState, action) {
    switch (action.type) {
        // case ADD_STUDENT: return [...state, action.payload ];
        case EDIT_STUDENT: 
            const { fname, lname, school_year, student_id } = action.payload.pinalit
            return state.map(student => {
                if(student.st_id === action.payload.id){
                    student.fname = fname;
                    student.lname  = lname;
                    student.school_year = school_year;
                    student.student_id = student_id
                }
                return student
            });
        case GET_STUDENTS: 
            state = action.payload
            return state;
        case DROP_STUDENT: 
            return state.filter(student => student.student_id !== action.payload )
        case VIEW_STUDENT: 
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default studentReducer