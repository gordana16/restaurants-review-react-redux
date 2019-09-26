import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import placesReducer from "./placesReducer";
import placeReducer from "./placeReducer";
import { newReviewReducer, newPlaceReducer } from "./localReducer";
import { RESET_ADD_PLACE_FORM } from "../actions/types";

export default combineReducers({
  places: placesReducer,
  place: placeReducer,
  localReviews: newReviewReducer,
  localPlaces: newPlaceReducer,
  form: formReducer.plugin({
    addPlace: (state, action) => {
      switch (action.type) {
        case RESET_ADD_PLACE_FORM:
          return undefined;
        default:
          return state;
      }
    }
  })
});
