import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
  MERGE_PLACES,
  FETCH_PLACES_END,
  FETCH_PLACE_BY_ID_INIT
} from "../actions/types";

export default ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === FETCH_PLACES_SUCCESS) {
    const { localPlaces } = getState();
    dispatch({
      type: MERGE_PLACES,
      payload: localPlaces
    });
  }
  if (action.type === MERGE_PLACES || action.type === FETCH_PLACES_FAIL) {
    dispatch({
      type: FETCH_PLACES_END
    });
    //reset selected place
    dispatch({
      type: FETCH_PLACE_BY_ID_INIT
    });
  }
};
