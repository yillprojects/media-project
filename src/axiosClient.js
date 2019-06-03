import axios from 'axios';

const host = 'http://localhost:8000/';

const defaultOptions = token => (
    {
        headers: {
            Authorization: token ? `JWT ${token}` : '',
        },
    }
);

const client = token => (
    {
        get: (url, options = {}) => axios.get(
            `${host}${url}/`, { ...defaultOptions(token), ...options }
        ),
        post: (url, data, options = {}) => axios.post(
            `${host}${url}/`, data, { ...defaultOptions(token), ...options }
        ),
        put: (url, data, options = {}) => axios.put(
            `${host}${url}/`, data, { ...defaultOptions(token), ...options }
        ),
        patch: (url, data, options = {}) => axios.patch(
            `${host}${url}/`, data, { ...defaultOptions(token), ...options }
        ),
        delete: (url, options = {}) => axios.delete(
            `${host}${url}/`, { ...defaultOptions(token), ...options }
        ),
    }
);

export default client;

