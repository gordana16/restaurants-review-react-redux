import { createSelector } from "reselect";

export const getError = state => state.place.error;
export const isFetching = state => state.place.isFetching;

const placeSelector = state => state.place.details;

const localAddsOnSelector = state => state.localAddsOn;

const placeIdSelector = createSelector(
  placeSelector,
  place => place.place_id
);
const placeRatingSelector = createSelector(
  placeSelector,
  place => place.rating || 0
);
const totalUserRatingSelector = createSelector(
  placeSelector,
  place => place.user_ratings_total || 0
);
const placeReviewsSelector = createSelector(
  placeSelector,
  place => place.reviews || []
);
const localReviewsByIdSelector = createSelector(
  placeIdSelector,
  localAddsOnSelector,
  (id, localPlaceAdds) => (localPlaceAdds[id] ? localPlaceAdds[id].reviews : [])
);

const allReviewsByIdSelector = createSelector(
  placeReviewsSelector,
  localReviewsByIdSelector,
  (reviews, localReviews) => [...reviews, ...localReviews]
);

const totalRatingSelector = createSelector(
  totalUserRatingSelector,
  localReviewsByIdSelector,
  placeRatingSelector,
  (totalUser, localReviews, currentRating) => {
    if (!localReviews.length) return currentRating;
    const totalRating =
      totalUser * currentRating +
      localReviews.reduce((rating, review) => rating + review.rating, 0);
    const newRating = totalRating / (localReviews.length + totalUser);
    return (newRating * 10) % 10 ? parseFloat(newRating.toFixed(1)) : newRating;
  }
);

export const getPlace = createSelector(
  placeSelector,
  allReviewsByIdSelector,
  totalRatingSelector,
  (place, reviews, rating) => ({ ...place, reviews, rating })
);
