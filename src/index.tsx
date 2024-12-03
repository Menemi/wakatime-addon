import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { NotificationProvider } from './modules/Notification/NotificationProvider';
import { ThemeProvider } from './modules/Theme/ThemeProvider';

ReactDOM.render(
    <ThemeProvider>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </ThemeProvider>,
    document.getElementById('root'),
);
