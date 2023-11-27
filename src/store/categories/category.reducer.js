// import { CATEGORIES_ACTION_TYPES } from './category.types';

import { createSlice } from "@reduxjs/toolkit";

export const CATEGORIES_INITIAL_STATE = {
  categoriesArray: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategoriesArray: (state, action) => {
      state.categoriesArray = action.payload;
    }
  }
});

export const {setCategoriesArray} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;


// OLD WAY BEFORE USING REDUX TOOLKIT
// export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_ARRAY:
//       return { ...state, categoriesArray: payload };
//     default:
//       return state;
//   }
// };
