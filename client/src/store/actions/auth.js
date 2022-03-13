import api from '../../apis/apiAuthService';
import Cookies from 'js-cookie';
import { AUTH_USER, USER_ADDED } from '../action-types/auth'

export function register({ name, surname, email, password }) {
    return async dispatch => {
        try {
            const response = await api.post('/api/auth/register', { name, surname, email, password });

            dispatch({
                type: USER_ADDED,
                payload: response.data,
            });

            return true;
        } catch (error) {
            const { message } = error.response.data;
            dispatch({
                type: USER_ADDED,
                payload: { message }
            });
            return error.message;
        }
    }
}

export function login({ email, password }) {
    return async dispatch => {
        try {
            const response = await api.post('/api/auth/login', { email, password });

            Cookies.set('token', response.data.token);

            dispatch({
                type: AUTH_USER,
                payload: response.data,
            });

            return true;
        } catch (error) {
            dispatch({
                type: AUTH_USER,
                payload: {loginFailed: true}
            });
            return error.message;
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            await api.put('/api/auth/logout');

            Cookies.remove('token');

            dispatch({
                type: AUTH_USER,
                payload: {},
            });

            return true;
        } catch (error) {
            return false;
        }
    }
}

export function getMe() {
    return async dispatch => {
        try {
            const response = await api.get('/api/auth/get-me');
            
            dispatch({
                type: AUTH_USER,
                payload: response.data,
            });

            return true;
        } catch (error) {
            Cookies.remove('token');

            dispatch({
                type: AUTH_USER,
                payload: {},
            });
            return false;
        }
    }
}