import axios from 'axios';
import {getCookie, setCookie, removeCookie } from '../utils/cookie';

const tokenKey = 'auth-token';

export function setAuthToken(token) {
    setCookie(tokenKey, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function resetAuthToken() {
    removeCookie(tokenKey);
    delete axios.defaults.headers.common['Authorization'];
}

export function getAuthToken(context) {
    return getCookie(tokenKey, context);
}
