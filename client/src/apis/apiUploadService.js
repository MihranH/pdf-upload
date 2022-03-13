import axios from 'axios';
import Cookies from 'js-cookie';

const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_UPLOAD_API_BASE_URL || 'http://localhost:3002',
});

apiAxios.interceptors.response.use(
    async res => {
     return res;
    }
 );

apiAxios.interceptors.request.use(req => {
  if (req) {
    const token = Cookies.get('token');
    req.headers.Authorization = token;
    return req;
  } 
});

export default apiAxios;