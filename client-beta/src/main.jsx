import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {ConfigProvider} from "antd";
import App from './App'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
        <ConfigProvider direction="rtl">
            <BrowserRouter>
                <App />
            </BrowserRouter>
         </ConfigProvider>
)
