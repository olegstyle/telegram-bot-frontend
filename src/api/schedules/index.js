import axios from '../client';

export default {
    list: () => axios.get('schedules'),
    one: (id) => axios.get('schedules/' + id),
    create: (data) => axios.post('schedules', data),
    edit: (id, data) => axios.post('schedules/' + id, data),
    delete: (id) => axios.delete('schedules/' + id),
};
