import {
  FETCH_PLACE_BY_ID_RESET,
  FETCH_PLACE_BY_ID_START,
  FETCH_PLACE_BY_ID_SUCCESS,
  FETCH_PLACE_BY_ID_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  details: {},
  error: null,
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACE_BY_ID_RESET: {
      return INITIAL_STATE;
    }
    case FETCH_PLACE_BY_ID_START: {
      return { ...state, isFetching: true };
    }

    case FETCH_PLACE_BY_ID_SUCCESS: {
      return { ...state, details: action.payload, isFetching: false };
    }

    case FETCH_PLACE_BY_ID_FAIL: {
      return { ...state, error: action.payload, isFetching: false };
    }

    default: {
      return state;
    }
  }
};
