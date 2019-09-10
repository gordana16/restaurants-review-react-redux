import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAIL } from "./types";
import GoogleService from "../services/GoogleService";

export const fetchPlaces = () => dispatch => {
  const service = new GoogleService();
  service.getNearbyPlaces().then(
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
