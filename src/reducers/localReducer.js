import {
  ADD_REVIEW_SUCCESS,
  ADD_PLACE_SUCCESS,
  UPDATE_RATING
} from "../actions/types";

export const localAddsOnReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_SUCCESS: {
      const { place_id, review } = action.payload;
      if (!state[place_id]) {
        return {
          ...state,
          [place_id]: { reviews: [review] }
        };
      }
      return {
        ...state,
        [place_id]: {
          ...state[place_id],
          reviews: [...state[place_id].reviews, review]
        }
      };
    }

    case UPDATE_RATING: {
      const { place_id, rating } = action.payload;
      return { ...state, [place_id]: { ...state[place_id], rating: rating } };
    }

    default: {
      return state;
    }
  }
};

export const localPlaceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PLACE_SUCCESS: {
      return [...state, action.payload];
    }

    default: {
      return state;
    }
  }
};
