import {SET_CURRENT_USER} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, current: action.payload};
        default:
            return state || {current: null};
    }
};
