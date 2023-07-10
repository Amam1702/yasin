import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/plugins/jquery/jquery.min.js';
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.min.js';
import MasterLayout from './layouts/MasterLayout';
import { ToastConfig } from './layouts/toastConfig';
axios.defaults.baseURL = 'https://seashell-app-cthwc.ondigitalocean.app/api/v1/';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
   {/* <React.StrictMode> */}
     {/* <MasterLayout>
       <BrowserRouter> */}
        <App />
        <ToastConfig />
       {/* </BrowserRouter>
     </MasterLayout> */}
   {/* </React.StrictMode> */}
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
