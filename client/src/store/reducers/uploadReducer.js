import { UPLOAD, GET_USER_UPLOADS } from '../action-types/upload'

const initialState = {
    uploaded: false,
    userUploads: [],
    total: 10
}

export default function uploadReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    
    switch (action.type) {
        case UPLOAD:
            return {
                ...state,
                uploaded: action.payload
            }
        case GET_USER_UPLOADS:
            return {
                ...state,
                userUploads: action.payload.result,
                total: action.payload.count
            }
        default:
            return state
    }

}
