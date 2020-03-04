import { SPEC_OBJ } from "../constants/examConstants";
import Immutable from "immutable";

const initialState = Immutable.fromJS({
  spec: ""
});

/**
 * Reducers
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SPEC_OBJ:
      return state.set("spec", action.spec);
    default:
      return state;
  }
};
