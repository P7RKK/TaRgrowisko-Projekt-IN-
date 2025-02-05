import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import Store
import App from './App';
import reportWebVitals from './reportWebVitals'; // Import reportWebVitals

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// Wywołanie reportWebVitals do logowania wyników wydajności
reportWebVitals(console.log); // Możesz zamienić console.log na funkcję wysyłającą dane do analityki
