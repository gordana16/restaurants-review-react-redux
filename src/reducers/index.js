import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import placesReducer from "./placesReducer";
import reviewsReducer from "./reviewsReducer";

export default combineReducers({
  places: placesReducer,
  reviews: reviewsReducer,
  form: formReducer
});
