//Imports style sheet
import './index.css';

//Imports React, createRoot from react-dom/client, Provider from Redux, the configured store from store.js, and BrowserRouter as Router  from react-router-dom
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from "react-router-dom";

//Imports the App component
import App from './app/App';

//Defines root of application
const container = document.getElementById('root');
const root = createRoot(container);

//Renders App wrapped in Redux provider for state, React.StrictMode, and finally Router so users can navigate the app via url
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);
