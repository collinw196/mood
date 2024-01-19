import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store/store';
import { Provider } from 'react-redux'

const initializeAwsSdk = async () => {
  const AWS = await import('aws-sdk');
  // Use AWS here
  const configuration = {
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
  }

  AWS.config.update(configuration)
};

initializeAwsSdk();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
