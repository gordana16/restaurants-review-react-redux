import {
  FETCH_PLACE_BY_ID_INIT,
  FETCH_PLACE_BY_ID_START,
  FETCH_PLACE_BY_ID_END,
  FETCH_PLACE_BY_ID_SUCCESS,
  FETCH_PLACE_BY_ID_FAIL,
  MERGE_REVIEWS_BY_ID,
  ADD_REVIEW_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  details: {},
  error: null,
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACE_BY_ID_INIT: {
      return INITIAL_STATE;
    }
    case FETCH_PLACE_BY_ID_START: {
      return { ...state, isFetching: true };
    }

    case FETCH_PLACE_BY_ID_SUCCESS: {
      return { ...state, details: action.payload };
    }

    case FETCH_PLACE_BY_ID_FAIL: {
      return { ...state, error: action.payload };
    }

    case FETCH_PLACE_BY_ID_END: {
      return { ...state, isFetching: false };
    }

    case ADD_REVIEW_SUCCESS: {
      const { review } = action.payload;
      const { reviews } = state.details;
      if (!reviews) {
        return {
          ...state,
          details: {
            ...state.details,
            reviews: [review]
          }
        };
      }
      return {
        ...state,
        details: {
          ...state.details,
          reviews: [...reviews, review]
        }
      };
    }

    case MERGE_REVIEWS_BY_ID: {
      const localReviews = action.payload;
      const { reviews } = state.details;
      if (!reviews) {
        return {
          ...state,
          details: { ...state.details, reviews: localReviews }
        };
      }
      return {
        ...state,
        details: {
          ...state.details,
          reviews: [...reviews, ...localReviews]
        }
      };
    }

    default: {
      return state;
    }
  }
};
