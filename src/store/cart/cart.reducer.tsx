// import { CART_ACTION_TYPES } from './cart.types';

import { createSlice } from "@reduxjs/toolkit";

import {CategoryItem } from "../categories/category.types";

export type CartItem = CategoryItem & {
  quantity: number;
};

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
  addedProduct: null | CategoryItem;
};

const addCartItem = (cartItems: CartItem[], productToAdd: CartItem): CartItem[] => {
  const itemExistsInCart = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (itemExistsInCart) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  // find the cart item to remove
  const itemExistsInCart = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (itemExistsInCart && itemExistsInCart.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
  addedProduct: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems = addCartItem(state.cartItems, action.payload);
      state.addedProduct = action.payload;
    },

    removeItemFromCart: (state, action) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },

    clearItemFromCart: (state, action) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },

    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },

    clearSuccessMessage: (state) => {
      state.addedProduct = null;
    }
  }
});

export const {addItemToCart, removeItemFromCart, clearItemFromCart, setIsCartOpen, clearSuccessMessage} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;


// OLD WAY BEOFRE REDUX TOOLKIT
// export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         cartItems: payload,
//       };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       };
//     default:
//       return state;
//   }
// };
