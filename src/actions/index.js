import google from "../services/GoogleService";
import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
  FETCH_PLACE_BY_ID_SUCCESS,
  FETCH_PLACE_BY_ID_FAIL,
  ADD_REVIEW
} from "./types";

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
      rejected =>
        dispatch({
          type: FETCH_PLACES_FAIL,
          payload: rejected
        })
    );
};

// export const fetchPlaceDetails = id => dispatch => {
//   return google
//     .getAPI()
//     .then(() => google.initService())
//     .then(() => google.getPlaceDetails(id))
//     .then(place => {
//       return dispatch({
//         type: MERGE_REVIEWS_BY_ID,
//         payload: { id: place.place_id, reviews: place.reviews }
//       });
//       return {
//         name: place.name,
//         address: place.formatted_address,
//         phone: place.international_phone_number,
//         photos: place.photos,
//         rating: place.rating,
//         review: place.reviews,
//         website: place.website
//       };
//     })
//     .catch(rejected => Promise.reject(rejected));
// };

export const fetchPlaceDetails = id => dispatch => {
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

export const addReview = (id, review) => ({
  type: ADD_REVIEW,
  payload: { id, review }
});

export const mergeReviews = id => {};
