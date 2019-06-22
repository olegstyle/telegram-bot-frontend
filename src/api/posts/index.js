import axios from '../client';

const castToFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
            formData.append(key, data[key]);
        }
    }

    return formData;
};
const formDataConfig = {headers: {'content-type': 'multipart/form-data'}};

export default {
    list: () => axios.get('posts'),
    one: (id) => axios.get('posts/' + id),
    create: (data) => axios.post('posts', castToFormData(data), formDataConfig),
    edit: (id, data) => axios.post('posts/' + id, castToFormData(data), formDataConfig),
    delete: (id) => axios.delete('posts/' + id),
    immediately: (postId, botChatId) => axios.post(`posts/${postId}/immediately/${botChatId}`),
};
