import axios from '../client';
import chats from './chats';

export default {
    list: () => axios.get('bots'),
    one: (id) => axios.get('bots/' + id),
    delete: (id) => axios.delete('bots/' + id),
    create: (data) => axios.post('bots', data),

    chats,
};
