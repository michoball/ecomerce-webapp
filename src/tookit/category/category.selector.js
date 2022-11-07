import { createSelector } from "reselect";

const selectCartgoryReducer = (state) => state.category;

export const selectCategories = createSelector(
  [selectCartgoryReducer],
  (categoriesSlice) => categoriesSlice.categoriesMap
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categoriesMap) =>
    categoriesMap.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCartgoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
