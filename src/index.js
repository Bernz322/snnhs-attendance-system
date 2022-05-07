import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';

import authReducer from './features/auth/authSlice'
import attendanceReducer from './features/attendance/attendanceSlice'
import userReducer from './features/user/userSlice'

import './index.css';
import App from './App';

const store = configureStore({
    reducer: { auth: authReducer, attendance: attendanceReducer, user: userReducer }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
