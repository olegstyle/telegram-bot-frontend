import {SET_CURRENT_USER} from '../../types';
import api from '../../../src/api';
import {UserModel} from "../../../src/models/UserModel";

export default {
    getCurrentUser(onFulfilled, onRejected) {
        return (dispatch) => {
            api.users.current()
                .then((response) => {
                    dispatch({type: SET_CURRENT_USER, payload: new UserModel(response.data.data)});
                    typeof onFulfilled === 'function' ? onFulfilled(response) : {};
                })
                .catch((err) => {
                    typeof onRejected === 'function' ? onRejected(err) : {};
                });
        };
    },
};
