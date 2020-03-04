import { fromJS } from "immutable";

const initialState = fromJS({
  doctor: ""
});

export default function(state = initialState, action) {
  switch (action.type) {
    case "CURENTDOC":
      // return action.payload;
      return state.set("doctor", action.payload);
    default:
      return state;
  }
}
