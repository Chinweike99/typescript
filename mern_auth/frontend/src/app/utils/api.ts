// import axios from 'axios';

// export const api = axios.create({
//     baseURL: 'http://localhost:5000/api', // Use http instead of https
//     withCredentials: true,
//   });



import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
  console.log('Sending request:', config);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response);
    return response;
  },
  (error) => {
    console.error('Request failed:', error);
    return Promise.reject(error);
  }
);