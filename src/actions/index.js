import google from "../services/GoogleService";
import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAIL, ADD_REVIEW } from "./types";

export const fetchPlaces = () => dispatch => {
  google
    .getAPI()
    .then(() => google.getNearbyPlaces())
    .then(
      response =>
        dispatch({
          type: FETCH_PLACES_SUCCESS,
          payload: response
        }),
      rejected => {
        return dispatch({
          type: FETCH_PLACES_FAIL,
          payload: rejected
        });
      }
    );
};

export const fetchPlaceDetails = id => {
  return google
    .getAPI()
    .then(() => google.getPlaceDetails(id))
    .then(place => ({
      name: place.name,
      address: place.formatted_address,
      phone: place.international_phone_number,
      photos: place.photos,
      rating: place.rating,
      review: place.reviews,
      website: place.website
    }))
    .catch(rejected => Promise.reject(rejected));
};

export const addReview = (placeId, review) => ({
  type: ADD_REVIEW,
  payload: { placeId, review }
});
