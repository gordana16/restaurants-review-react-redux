import { ADD_REVIEW } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      if (!state[action.payload["placeId"]]) {
        return {
          ...state,
          [action.payload["placeId"]]: [action.payload["review"]]
        };
      }
      return {
        ...state,
        [action.payload["placeId"]]: [
          ...state[action.payload["placeId"]],
          action.payload["review"]
        ]
      };
    }
    default: {
      return state;
    }
  }
};
