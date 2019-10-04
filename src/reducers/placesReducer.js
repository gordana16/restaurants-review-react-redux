import {
  FETCH_PLACES_INIT,
  FETCH_PLACES_START,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  error: null,
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACES_INIT: {
      return INITIAL_STATE;
    }

    case FETCH_PLACES_START: {
      return { ...state, isFetching: true };
    }

    case FETCH_PLACES_SUCCESS: {
      return { ...state, data: action.payload, isFetching: false };
    }

    case FETCH_PLACES_FAIL: {
      return { ...state, error: action.payload, isFetching: false };
    }

    default:
      return state;
  }
};
