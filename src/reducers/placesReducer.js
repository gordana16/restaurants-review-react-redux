import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAIL } from "../actions/types";

const INITIAL_STATE = {
  data: [],
  error: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS: {
      return { ...state, data: action.payload, error: undefined };
    }

    case FETCH_PLACES_FAIL:
      return { ...state, error: action.payload };

    default:
      return INITIAL_STATE;
  }
};
