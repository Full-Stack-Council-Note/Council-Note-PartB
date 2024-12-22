import React from 'react';
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css';
//import axios from 'axios';
import.meta.env.VITE_PORT
//import.meta.env.REACT_APP_ENDPOINT
                        
axios.defaults.baseURL = 'https://councilnote.netlify.app/';
//axios.defaults.REACT_APP_ENDPOINT = 'https://council-note-backend-5cf218cede7a.herokuapp.com/';

//axios.defaults.baseURL = "https://"; change to netlify URL

//ReactDOM.createRoot(document.getElementById('root')).render(<App />);

//ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  //  <App />
 //</React.StrictMode>
//)

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

