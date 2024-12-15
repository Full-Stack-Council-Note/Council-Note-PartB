//import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import axios from 'axios';
import.meta.env.VITE_PORT
import.meta.env.REACT_APP_ENDPOINT

axios.defaults.baseURL = 'http://localhost:8080';
//axios.defaults.baseURL = "https://";

//ReactDOM.createRoot(document.getElementById('root')).render(<App />);

//ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  //  <App />
 //</React.StrictMode>
//)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

