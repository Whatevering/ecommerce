import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, cartActions } from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const actions = {
  cart: cartActions,
};

export { store, actions };
