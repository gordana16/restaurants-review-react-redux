import google from "../services/GoogleService";
import {
  FETCH_PLACES_INIT,
  FETCH_PLACES_START,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
  FETCH_PLACE_BY_ID_INIT,
  FETCH_PLACE_BY_ID_START,
  ADD_PLACE_SUCCESS,
  ADD_REVIEW_SUCCESS,
  RESET_ADD_PLACE_FORM
} from "./types";

export const fetchPlaces = () => dispatch => {
  dispatch({
    type: FETCH_PLACES_INIT
  });
  dispatch({
    type: FETCH_PLACES_START
  });
  google
    .getAPI()
    .then(() => google.getNearbyPlaces())
    .then(
      response =>
        dispatch({
          type: FETCH_PLACES_SUCCESS,
          payload: response
        }),
      rejected =>
        dispatch({
          type: FETCH_PLACES_FAIL,
          payload: rejected
        })
    );
};

export const fetchPlaceDetails = id => dispatch => {
  dispatch({
    type: FETCH_PLACE_BY_ID_INIT
  });

  return dispatch({
    type: FETCH_PLACE_BY_ID_START,
    payload: id
  });
};

export const addPlace = place => dispatch => {
  const position = google.getInfoWindow().getPosition();
  dispatch({
    type: ADD_PLACE_SUCCESS,
    payload: {
      ...place,
      place_id: Date.now().toString(),
      rating: 0,
      geometry: { location: position }
    }
  });

  dispatch({
    type: RESET_ADD_PLACE_FORM
  });
};

export const addReview = (place_id, review) => ({
  type: ADD_REVIEW_SUCCESS,
  payload: { place_id, review }
});

export const resetAddPlaceForm = () => ({
  type: RESET_ADD_PLACE_FORM
});
