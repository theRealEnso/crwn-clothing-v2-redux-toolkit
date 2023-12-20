import { createSelector } from 'reselect';

import { CartItem } from './cart.reducer';

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => cartItems.reduce((total: number, cartItem: CartItem) => total + cartItem.quantity * cartItem.price, 0));

export const selectCartCount = createSelector([selectCartItems], (cartItems) => cartItems.reduce((total: number, cartItem: CartItem) => total + cartItem.quantity, 0));

export const selectAddedProduct = createSelector([selectCartReducer], (cart) => cart.addedProduct);

