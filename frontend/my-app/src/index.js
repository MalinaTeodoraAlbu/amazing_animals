import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import store from './store/store';
import { Provider } from 'react-redux';
import {StripeProvider} from '@stripe/react-stripe-js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


