import {LOGIN, LOGOUT} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {token: action.payload};
        case LOGOUT:
            return {token: null};
        default:
            return state || {token: null};
    }
};
