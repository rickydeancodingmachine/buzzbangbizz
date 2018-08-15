import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getIdToken } from './utils/AuthService';

axios.defaults.baseURL = '/api';
axios.defaults.headers.common.Authorization = getIdToken();

axios.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
