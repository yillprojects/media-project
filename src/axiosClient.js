import axios from 'axios';

const sessionToken = sessionStorage.getItem('token');
const localToken = localStorage.getItem('token');
const token = (sessionToken || localToken);

const defaultOptions = {
    headers: {
        Authorization: token ? `JWT ${token}` : '',
    },
};

const client = {
    get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
};

export default client;

