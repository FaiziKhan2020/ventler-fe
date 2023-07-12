import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/Store';
import './index.css';
import {QueryClient, QueryClientProvider}from 'react-query'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={configureStore()}>
      <App />
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
