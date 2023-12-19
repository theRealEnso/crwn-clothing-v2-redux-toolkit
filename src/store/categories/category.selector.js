import { createSelector } from 'reselect';

const extractCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector([extractCategoryReducer], (categoriesSlice) => categoriesSlice.categoriesArray); //state.categories.categoriesArray

export const selectCategoriesIsLoading = createSelector([extractCategoryReducer], (categoriesSlice) => categoriesSlice.isLoading);

export const selectCategoriesMap = createSelector([selectCategories], (categoriesArray) => categoriesArray.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
