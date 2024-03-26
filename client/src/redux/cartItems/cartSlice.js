import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    ADD_TO_CART: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.product === item.product);
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    REMOVE_CART_ITEM: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
    },
  },
});

export const cartItemsAction = cartSlice.actions;

export default cartSlice.reducer;
