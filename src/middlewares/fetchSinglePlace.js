import google from "../services/GoogleService";
import {
  FETCH_PLACE_BY_ID_START,
  FETCH_PLACE_BY_ID_END,
  FETCH_PLACE_BY_ID_SUCCESS,
  FETCH_PLACE_BY_ID_FAIL,
  MERGE_REVIEWS_BY_ID
} from "../actions/types";

export default ({ dispatch, getState }) => next => action => {
  next(action);
  const { localReviews, localPlaces } = getState();
  if (action.type === FETCH_PLACE_BY_ID_START) {
    const id = action.payload;
    const place = localPlaces.find(lp => lp.place_id === id);
    if (place) {
      return dispatch({
        type: FETCH_PLACE_BY_ID_SUCCESS,
        payload: place
      });
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
  }
  if (action.type === FETCH_PLACE_BY_ID_SUCCESS) {
    const { place_id } = action.payload;
    return dispatch({
      type: MERGE_REVIEWS_BY_ID,
      payload: localReviews[place_id] || []
    });
  }

  if (
    action.type === MERGE_REVIEWS_BY_ID ||
    action.type === FETCH_PLACE_BY_ID_FAIL
  ) {
    dispatch({
      type: FETCH_PLACE_BY_ID_END
    });
  }
};
