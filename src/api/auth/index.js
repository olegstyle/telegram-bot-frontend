import axios from '../client';

export default {
    login: (data) => axios.post('auth/login', data),
    register: (data) => axios.post('auth/register', data),
};
