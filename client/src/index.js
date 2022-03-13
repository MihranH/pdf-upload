import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import "./global.css";
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import rootReducer from './store/reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();