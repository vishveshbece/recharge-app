import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Import the App component

// Get the root element from your HTML
const container = document.getElementById('root');

// Create a root and render the application
const root = createRoot(container);
root.render(
  <Router> {/* Wrap your app with Router here */}
    <App />
  </Router>
);
