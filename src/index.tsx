import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {NotificationProvider} from './modules/Notification/NotificationProvider';

ReactDOM.render(
    <NotificationProvider>
        <App/>
    </NotificationProvider>,
    document.getElementById('root')
);
