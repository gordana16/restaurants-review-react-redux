import {
  FETCH_PLACES_INIT,
  FETCH_PLACES_START,
  FETCH_PLACES_END,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
  ADD_PLACE_SUCCESS,
  MERGE_PLACES
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
      return { ...state, data: action.payload };
    }

    case FETCH_PLACES_FAIL: {
      return { ...state, error: action.payload };
    }

    case FETCH_PLACES_END: {
      return { ...state, isFetching: false };
    }

    case ADD_PLACE_SUCCESS: {
      return { ...state, data: [...state.data, action.payload] };
    }

    case MERGE_PLACES: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
        isFetching: true
      };
    }

    default:
      return state;
  }
};
