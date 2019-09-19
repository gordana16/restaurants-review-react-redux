import {
  FETCH_PLACE_BY_ID_SUCCESS,
  ADD_REVIEW,
  MERGE_REVIEWS_BY_ID
} from "../actions/types";

export default ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === FETCH_PLACE_BY_ID_SUCCESS || action.type === ADD_REVIEW) {
    const { reviews } = getState();
    const id = action.payload.place_id || action.payload.id;
    dispatch({
      type: MERGE_REVIEWS_BY_ID,
      payload: reviews[id] || []
    });
  }
};
