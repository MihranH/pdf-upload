import { Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {    
    const { isLoggedIn, children } = rest;
 
    return (
        isLoggedIn ? children : <Navigate to="/login" />
    );  
};
export default PrivateRoute;