import {
  FETCH_PLACE_BY_ID_SUCCESS,
  FETCH_PLACE_BY_ID_FAIL,
  MERGE_REVIEWS_BY_ID
} from "../actions/types";

const INITIAL_STATE = {
  details: {},
  error: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACE_BY_ID_SUCCESS: {
      return { ...state, details: action.payload, error: undefined };
    }

    case FETCH_PLACE_BY_ID_FAIL:
      return { ...state, details: {}, error: action.payload };

    case MERGE_REVIEWS_BY_ID: {
      console.log(action.payload);
      return {
        ...state,
        details: {
          ...state.details,
          reviews: [...new Set([...state.details.reviews, ...action.payload])]
        },
        error: undefined
      };
    }

    default: {
      return state;
    }
  }
};
