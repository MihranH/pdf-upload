import {combineReducers} from 'redux'
import authReducer from './authReducer';
import uploadReducer from './uploadReducer';

export default combineReducers({
    auth: authReducer,
    upload: uploadReducer
});