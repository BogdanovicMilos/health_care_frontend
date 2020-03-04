import {
    PRICE
} from '../constants/examConstants';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    price: null,
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case PRICE:
            return state.set('price', action.price)
        default:
            return state;
    }
};