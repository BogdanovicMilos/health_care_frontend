import { EXAM_ID } from "../constants/examConstants";
import Immutable from "immutable";

const initialState = Immutable.fromJS({
  examID: null
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case EXAM_ID:
      return state.set("examID", action.exam);
    default:
      return state;
  }
};
