import { CATEGORIES_ACTION_TYPES } from './category.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCategoriesArray = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ARRAY, categoriesArray);
