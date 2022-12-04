import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemList: [],
    qty: 0,
    subtotal: 0,
  },
  reducers: {
    update(state, actions) {
      state.itemList = actions.payload;

      // update qty
      state.qty = state.itemList.length;

      // update subtotal
      let subtotal = 0;
      for (let i = 0; i < state.itemList.length; i++) {
        const item = state.itemList[i];
        subtotal += item.qty * item.price;
      }
      state.subtotal = subtotal;
    },
    add(state, actions) {
      const slug = actions.payload.slug;
      const newQty = actions.payload.qty;

      const existItem = state.itemList.filter(
        (item) => item.slug.current === slug.current
      )[0];
      const existQty = existItem ? existItem.qty : 0;

      state.itemList = [
        ...state.itemList.filter((item) => item.slug.current !== slug.current),
        {
          ...actions.payload,
          qty: existQty + newQty,
        },
      ];

      // update qty
      state.qty = state.itemList.length;

      // update subtotal
      let subtotal = 0;
      for (let i = 0; i < state.itemList.length; i++) {
        const item = state.itemList[i];
        subtotal += item.qty * item.price;
      }
      state.subtotal = subtotal;

      // save to local storage
      localStorage.setItem("itemList", JSON.stringify(state.itemList));
    },
    reduce(state, actions) {
      const slug = actions.payload.slug;
      const reduceQty = actions.payload.qty;

      const existItem = state.itemList.filter(
        (item) => item.slug.current === slug.current
      )[0];
      const existQty = existItem ? existItem.qty : 0;

      state.itemList = [
        ...state.itemList.filter((item) => item.slug.current !== slug.current),
        {
          ...actions.payload,
          qty: existQty - reduceQty,
        },
      ];

      // update qty
      state.qty = state.itemList.length;

      // update subtotal
      let subtotal = 0;
      for (let i = 0; i < state.itemList.length; i++) {
        const item = state.itemList[i];
        subtotal += item.qty * item.price;
      }
      state.subtotal = subtotal;

      // save to local storage
      localStorage.setItem("itemList", JSON.stringify(state.itemList));
    },
    remove(state, actions) {
      // payload is item
      state.itemList = state.itemList.filter(
        (item) => item.slug.current !== actions.payload.slug.current
      );

      // update qty
      state.qty = state.itemList.length;

      // update subtotal
      let subtotal = 0;
      for (let i = 0; i < state.itemList.length; i++) {
        const item = state.itemList[i];
        subtotal += item.qty * item.price;
      }
      state.subtotal = subtotal;

      // save to local storage
      localStorage.setItem("itemList", JSON.stringify(state.itemList));
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
