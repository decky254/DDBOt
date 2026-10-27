import React from 'react';
import ReactDOM from 'react-dom/client';
import { Modal } from '@deriv-com/ui';
import App from './app/App';

const container = document.getElementById('root');
if (container) {
    Modal.setAppElement(container);
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

