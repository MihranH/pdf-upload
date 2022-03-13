import api from '../../apis/apiUploadService';
import { UPLOAD, GET_USER_UPLOADS } from '../action-types/upload'

export function uploadFile(formData) {
    return async dispatch => {
        try {
            await api.post('/api/upload', formData);

            dispatch({
                type: UPLOAD,
                payload: true,
            });

            return true;
        } catch (error) {
            dispatch({
                type: UPLOAD,
                payload: false,
            });
            return error.message;
        }
    }
}

export function resetUploadFile() {
    return dispatch => {
        dispatch({
            type: UPLOAD,
            payload: false,
        });
    }
}

export function getUserUploads(page) {
    return async dispatch => {
        try {
            const response = await api.get(`/api/upload?page=${page}`);

            dispatch({
                type: GET_USER_UPLOADS,
                payload: response.data,
            });

            return true;
        } catch (error) {
            return error.message;
        }
    }
}
