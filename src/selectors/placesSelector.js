import { createSelector } from "reselect";
import { NO_SORT } from "../actions/types";

const placesSelector = state => state.places.data;
const sortDirectionSelector = state => state.places.sortDirection;
const ratingFilterSelector = state => state.places.ratingFilter;
const localPlacesSelector = state => state.localPlaces;
const localAddsOnSelector = state => state.localAddsOn;

export const getPlaces = createSelector(
  placesSelector,
  localPlacesSelector,
  localAddsOnSelector,
  sortDirectionSelector,
  ratingFilterSelector,
  (places, localPlaces, localAddsOn, sortDirection, filter) => {
    const allPlaces = [...places, ...localPlaces];
    //update places with new rating
    const mergedPlaces = allPlaces.map(place => {
      const id = place.place_id;
      if (localAddsOn[id]) {
        return { ...place, rating: localAddsOn[id].rating };
      }
      return place;
    });
    const filteredPlaces = mergedPlaces.filter(place => place.rating >= filter);

    if (sortDirection === NO_SORT) {
      return filteredPlaces;
    }
    return sortPlaces(filteredPlaces, sortDirection);
  }
);

export const getError = state => state.places.error;
export const isFetching = state => state.places.isFetching;
export const isSorting = state => state.places.sortDirection !== 0;
export const getSort = state => state.places.sortDirection;
export const getFilter = state => state.places.ratingFilter;

const sortPlaces = (places, direction) =>
  places.sort((p1, p2) => {
    return direction * (p1.rating - p2.rating);
  });
