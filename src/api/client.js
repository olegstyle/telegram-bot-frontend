import axios from 'axios';
import { resetAuthToken, getAuthToken, setAuthToken } from './token';

axios.defaults.baseURL = process.env.API_URL;

const token = getAuthToken();
if (token) {
    setAuthToken(token);
} else {
    resetAuthToken();
}

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Unauthorized
        if (error.response.status === 401) {
            resetAuthToken();
            // TODO go to login page.
        }

        return Promise.reject(error);
    }
);

export default axios;
