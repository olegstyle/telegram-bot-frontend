import axios from '../client';

export default {
    list: () => axios.get('posts'),
    create: (data) => axios.post('posts', data),
    one: (id) => axios.get('posts/' + id),
    delete: (id) => axios.delete('posts/' + id),
    edit: (id, data) => axios.post('posts/' + id, data),
    immediately: (postId, botId) => axios.post(`posts/${postId}/immediately/${botId}`, data),
};
