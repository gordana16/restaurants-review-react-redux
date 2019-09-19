import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import placesReducer from "./placesReducer";
import placeReducer from "./placeReducer";
import reviewsReducer from "./reviewsReducer";

export default combineReducers({
  places: placesReducer,
  place: placeReducer,
  reviews: reviewsReducer,
  form: formReducer
});
