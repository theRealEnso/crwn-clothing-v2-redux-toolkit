// import { CATEGORIES_ACTION_TYPES } from './category.types';

import { createSlice } from "@reduxjs/toolkit";
import {Category} from './category.types'

export type CategoriesState = {
  categoriesArray: Category[];
  isLoading: boolean;
  error: Error | null
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categoriesArray: [],
  isLoading: false,
  error: null
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategoriesArray: (state, action) => {
      state.categoriesArray = action.payload;
    },

    fetchCategoriesStart: (state) => {
      state.isLoading = true;
    },

    fetchCategoriesSuccess: (state, action) => {
      state.categoriesArray = action.payload;
      state.isLoading = false;
    },

    fetchCategoriesFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    }
  }
});

export const {setCategoriesArray, fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;


// OLD WAY BEFORE USING REDUX TOOLKIT

// import { CATEGORIES_ACTION_TYPES } from "./category-types";

// export const CATEGORIES_INITIAL_STATE = {
//     categoriesArray: [],
//     isLoading: false,
//     error: null,
// };

// export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
//     const {type, payload} = action;

//     switch(type) {
//         case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//             return {
//                 ...state,
//                 isLoading: true
//             }
//         case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//             return {
//                 ...state,
//                 categoriesArray: payload,
//                 isLoading: false,
//             }
//         case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: payload
//             }
//         default:
//             return state;
//     };
// };

