import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth'
import { currentAuthenticatedUser, currentSession } from './utils/dynamodb/dynamodb.utils';
import * as AWS from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk'
import { store } from './app/store/store';
import { Provider } from 'react-redux'

const configuration = {
    region: 'us-east-1',
    secretAccessKey: 'za7liwhStvUIOt2NMcJVmyb/pTC14wgqasHD2nF7',
    accessKeyId: 'AKIA3FRDZSQVQE2CQDWL'
}

AWS.config.update(configuration)
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
