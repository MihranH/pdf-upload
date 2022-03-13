import { Navigate } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {    
    const { isLoggedIn, children } = rest;
 
    return (
        isLoggedIn ? <Navigate  to="/" /> : children
    );  
};
export default PublicRoute;