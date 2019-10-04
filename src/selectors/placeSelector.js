import { createSelector } from "reselect";

const placeSelector = state => state.place.details;
const placeIdSelector = state => state.place.details.place_id;
const placeReviewsSelector = state => state.place.details.reviews;
const placeRatingSelector = state => state.place.details.rating;
const totalUserRatingSelector = state => state.place.details.user_ratings_total;
const localAddsOnSelector = state => state.localAddsOn;
export const getError = state => state.place.error;
export const isFetching = state => state.place.isFetching;

const localReviewsByIdSelector = createSelector(
  placeIdSelector,
  localAddsOnSelector,
  (id, localPlace) => (localPlace[id] ? localPlace[id].reviews : [])
);

const allReviewsByIdSelector = createSelector(
  placeReviewsSelector,
  localReviewsByIdSelector,
  (reviews, localReviews) => {
    if (!reviews) return localReviews;
    return [...reviews, ...localReviews];
  }
);

const totalRatingSelector = createSelector(
  totalUserRatingSelector,
  localReviewsByIdSelector,
  placeRatingSelector,
  (totalUser, localReviews, currentRating) => {
    if (!localReviews || !localReviews.length) return currentRating;
    totalUser = totalUser ? totalUser : 0;
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
  (place, reviews, rating) => {
    return { ...place, reviews, rating };
  }
);
