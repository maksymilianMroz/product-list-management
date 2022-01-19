import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: {},
    areLoaded: false,
    areReloading: false,
    isEditing: false,
    editableProduct: {},
  },
  reducers: {
    getProducts(state, action) {
      state.items = action.payload.items;
      state.areLoaded = true;
      state.areReloading = true;
    },
    removeProducts(state) {
      state.areReloading = false;
    },
    addProduct(state) {
      state.areReloading = false;
    },
    editProductOn(state, action) {
      state.isEditing = true;
      state.editableProduct = action.payload;
    },
    editProductOff(state) {
      state.isEditing = false;
      state.areReloading = false;
    },
  },
});

export const productActions = productsSlice.actions;
export default productsSlice;
