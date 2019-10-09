import google from "../services/GoogleService";
import {
  FETCH_PLACES_INIT,
  FETCH_PLACES_START,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
  FETCH_PLACE_BY_ID_INIT,
  FETCH_PLACE_BY_ID_START,
  FETCH_PLACE_BY_ID_SUCCESS,
  FETCH_PLACE_BY_ID_FAIL,
  ADD_PLACE_SUCCESS,
  ADD_REVIEW_SUCCESS,
  UPDATE_RATING,
  RESET_ADD_PLACE_FORM
} from "./types";

const uuidv4 = require("uuid/v4");

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
  //reset current selected place
  dispatch({
    type: FETCH_PLACE_BY_ID_INIT
  });
};

export const fetchPlaceDetails = id => (dispatch, getState) => {
  dispatch({
    type: FETCH_PLACE_BY_ID_INIT
  });

  dispatch({
    type: FETCH_PLACE_BY_ID_START,
    payload: id
  });

  const { localPlaces } = getState();
  const place = localPlaces.find(lp => lp.place_id === id);
  if (place) {
    return setTimeout(
      () =>
        dispatch({
          type: FETCH_PLACE_BY_ID_SUCCESS,
          payload: place
        }),
      200
    );
  }
  return google
    .getAPI()
    .then(() => google.initService())
    .then(() => google.getPlaceDetails(id))
    .then(
      place =>
        dispatch({
          type: FETCH_PLACE_BY_ID_SUCCESS,
          payload: place
        }),
      rejected =>
        dispatch({
          type: FETCH_PLACE_BY_ID_FAIL,
          payload: rejected
        })
    );
};

export const addPlace = place => dispatch => {
  const position = google.getInfoWindow().getPosition();
  dispatch({
    type: ADD_PLACE_SUCCESS,
    payload: {
      ...place,
      place_id: uuidv4(),
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

export const updateRating = (place_id, rating) => ({
  type: UPDATE_RATING,
  payload: { place_id, rating }
});

export const resetAddPlaceForm = () => ({
  type: RESET_ADD_PLACE_FORM
});

export const fetchPlaceStreetView = location =>
  google
    .getPlaceStreetView(location)
    .then(result => result.location.pano, () => {});
