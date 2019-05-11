import Router from 'next/router';
import { LOGIN, LOGOUT } from '../../types';
import { setAuthToken, resetAuthToken } from '../../../src/api/token';
import api from '../../../src/api';

const receivedToken = (dispatch, token) => {
    setAuthToken(token);
    dispatch({type: LOGIN, payload: token});
    Router.push('/');
};

export default {
    login({ email, password }, onFulfilled, onRejected) {
        return (dispatch) => {
            api.auth.login({ email, password })
                .then((response) => {
                    receivedToken(dispatch, response.data.data.accessToken);
                    typeof onFulfilled === 'function' ? onFulfilled(response) : {};
                })
                .catch((err) => {
                    typeof onRejected === 'function' ? onRejected(err) : {};
                });
        };
    },

    register({ name, email, password }, onFulfilled, onRejected) {
        return (dispatch) => {
            api.auth.register({ name, email, password })
                .then((response) => {
                    receivedToken(dispatch, response.data.token);
                    typeof onFulfilled === 'function' ? onFulfilled(response) : {};
                })
                .catch((err) => {
                    typeof onRejected === 'function' ? onRejected(err) : {};
                });
        };
    },

    logout() {
        return (dispatch) => {
            resetAuthToken();
            dispatch({type: LOGOUT});
            Router.push('/');
        };
    }
};
