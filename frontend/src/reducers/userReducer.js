import { TYPES } from '../actions/types'


const defaultState = {
   data: {
        message: '',
        data: {},
        isLogged: false
   }
}

function userReducer(state = defaultState, action) {
    switch (action.type) {
        case TYPES.REGISTER:
            return action.payload
        case TYPES.LOGIN:
            return action.payload
        case TYPES.LOGOUT:
            return {
                data: {
                     message: '',
                     data: {},
                     isLogged: false
                }
             }
        default: return state
    }
}

export default userReducer