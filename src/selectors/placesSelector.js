import { createSelector } from "reselect";

const placesSelector = state => state.places.data;
const localPlacesSelector = state => state.localPlaces;
const localAddsOnSelector = state => state.localAddsOn;

export const getPlaces = createSelector(
  placesSelector,
  localPlacesSelector,
  localAddsOnSelector,
  (places, localPlaces, localAddsOn) => {
    const allPlaces = [...places, ...localPlaces];
    return allPlaces.map(place => {
      const id = place.place_id;
      if (localAddsOn[id]) {
        return { ...place, rating: localAddsOn[id].rating };
      }
      return place;
    });
  }
);

export const getError = state => state.places.error;
export const isFetching = state => state.places.isFetching;
