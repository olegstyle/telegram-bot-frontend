import axios from '../client';

export default {
    current: () => axios.get('users/current'),
};
