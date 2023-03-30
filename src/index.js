import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // commented because of double render (console.log)
    <App />
// </React.StrictMode>
);
