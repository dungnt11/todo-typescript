import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(async (config) => {
  config.baseURL = 'http://localhost:3002';
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
