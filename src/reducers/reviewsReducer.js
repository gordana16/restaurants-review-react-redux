import { ADD_REVIEW } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW: {
      if (!state[action.payload["id"]]) {
        return {
          ...state,
          [action.payload["id"]]: [action.payload["review"]]
        };
      }
      return {
        ...state,
        [action.payload["id"]]: [
          ...state[action.payload["id"]],
          action.payload["review"]
        ]
      };
    }
    // case MERGE_REVIEWS_BY_ID: {
    //   if (!state[action.payload["id"]]) {
    //     return {
    //       ...state,
    //       [action.payload["id"]]: [...action.payload["reviews"]]
    //     };
    //   }
    //   return {
    //     ...state,
    //     [action.payload["id"]]: [
    //       ...state[action.payload["id"]],
    //       ...action.payload["reviews"]
    //     ]
    //   };
    // }
    default: {
      return state;
    }
  }
};
