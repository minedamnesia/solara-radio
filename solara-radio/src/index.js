import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GeolocationProvider } from './context/GeolocationProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GeolocationProvider>
      <App />
    </GeolocationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
