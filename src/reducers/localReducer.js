import { ADD_REVIEW_SUCCESS, ADD_PLACE_SUCCESS } from "../actions/types";

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_SUCCESS: {
      const { place_id, review } = action.payload;
      if (!state[place_id]) {
        return {
          ...state,
          [place_id]: [review]
        };
      }
      return {
        ...state,
        [place_id]: [...state[place_id], review]
      };
    }

    default: {
      return state;
    }
  }
};

export const newPlaceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PLACE_SUCCESS: {
      return [...state, action.payload];
    }

    default: {
      return state;
    }
  }
};
