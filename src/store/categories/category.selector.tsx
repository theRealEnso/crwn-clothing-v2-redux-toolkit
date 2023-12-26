import { createSelector } from 'reselect';

import { CategoryMap, Category } from './category.types';
import { RootState } from '../store';

const extractCategoryReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector([extractCategoryReducer], (categoriesSlice) => categoriesSlice.categoriesArray); //state.categories.categoriesArray

export const selectCategoriesIsLoading = createSelector([extractCategoryReducer], (categoriesSlice) => categoriesSlice.isLoading);

export const selectCategoriesMap = createSelector([selectCategories], (categoriesArray): CategoryMap => categoriesArray.reduce((accumulator: CategoryMap, category: Category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      console.log(accumulator);
      return accumulator;
    }, {} as CategoryMap)
);

// {hats: Array(9), jackets: Array(5), mens: Array(6), sneakers: Array(8), womens: Array(7)}
