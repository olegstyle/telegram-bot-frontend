import axios from '../client';

export default {
    list: () => axios.get('bots/chats'),
    one: (id) => axios.get('bots/chats/' + id),
    delete: (id) => axios.delete('bots/chats/' + id),
    create: (data) => axios.post('bots/chats', data),
    edit: (id, data) => axios.post('bots/chats/' + id, data),
};
