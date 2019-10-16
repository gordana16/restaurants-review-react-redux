import {
  FETCH_PLACES_RESET,
  FETCH_PLACES_START,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
  SORT_PLACES,
  FILTER_PLACES,
  RESET_FILTER_PLACES,
  NO_SORT
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  error: null,
  isFetching: false,
  sortDirection: NO_SORT,
  ratingFilter: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACES_RESET: {
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

    case SORT_PLACES: {
      return { ...state, sortDirection: action.payload };
    }

    case FILTER_PLACES: {
      return { ...state, ratingFilter: action.payload };
    }

    case RESET_FILTER_PLACES: {
      return { ...state, ratingFilter: 0 };
    }

    default:
      return state;
  }
};
