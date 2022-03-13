import { useEffect } from 'react';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Main from './components/main/Main.jsx';
import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';
import { getMe } from './store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();   
  const privateRoutes = ['/'];

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const isLoggedIn = useSelector(state => !!state.auth.userData.email);
  
  return (
    <BrowserRouter>
       <Routes >
         {privateRoutes.map(route => <Route
                                        key={route}
                                        path={route}
                                        element={
                                          <PrivateRoute isLoggedIn={isLoggedIn}>
                                            <Main />
                                          </PrivateRoute>
                                        }
                                      />)}
        <Route
            path='/login'
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Register />
              </PublicRoute>
            }
          />
       </Routes >
       
     </BrowserRouter>
  );  
}

export default App;