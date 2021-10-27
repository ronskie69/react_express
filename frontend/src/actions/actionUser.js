import axios from "axios"
import { TYPES } from "./types";

export const login_user = (user) => async dispatch => {
    try {
        const result = await axios.post('http://localhost:3007/api/login', user);
        dispatch({
            type: TYPES.LOGIN,
            payload: result
        })
    } catch (error) {
        console.warn(error)
    }
}

export const logout_user = () => dispatch => {
    dispatch({ type: TYPES.LOGOUT })
}

export const register_user = (new_user) => async dispatch => {
    try {
        await axios.post('http://localhost:3007/api/register', new_user);
        dispatch({
            type: TYPES.REGISTER,
            payload: {
                message: "Registered successfully!",
            }
        })
    } catch (error) {
        console.warn(error)
    }
}