import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './redux/createStore';
import App from './routes/App';

const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);

root.render(<Provider store={store}><App /></Provider>);
