import axios from 'axios';

const defaultOptions = token => (
    {
        headers: {
            Authorization: token ? `JWT ${token}` : '',
        },
    }
);

const client = token => (
    {
        get: (url, options = {}) => axios.get(url, { ...defaultOptions(token), ...options }),
        post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions(token), ...options }),
        put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions(token), ...options }),
        delete: (url, options = {}) => axios.delete(url, { ...defaultOptions(token), ...options }),
    }
);

export default client;

