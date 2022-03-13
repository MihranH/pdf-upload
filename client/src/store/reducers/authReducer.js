import { AUTH_USER, USER_ADDED } from '../action-types/auth'

const initialState = {
    userData: {},
    userAdded: {}
}

export default function authReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case USER_ADDED:
            return {
                ...state,
                userAdded: action.payload
            }
        default:
            return state
    }

}
