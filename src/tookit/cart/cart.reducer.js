import { createSlice } from "@reduxjs/toolkit";

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    setCartItem(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
