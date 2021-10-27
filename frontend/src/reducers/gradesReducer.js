import { TYPES } from '../actions/types'

const {
    GET_GRADES
} = TYPES

const defaultState =  {}

function gradeReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_GRADES: 
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default gradeReducer