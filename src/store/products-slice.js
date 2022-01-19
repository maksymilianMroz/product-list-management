import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: {},
    areLoaded: false,
    areReloading: false,
    isEditing: false,
    editableProduct: {},
    isModalShow: false,
  },
  reducers: {
    getProducts(state, action) {
      state.items = action.payload.items;
      state.areLoaded = true;
      state.areReloading = true;
      state.isModalShow = false;
    },
    removeProducts(state) {
      state.areReloading = false;
    },
    addProduct(state) {
      state.areReloading = false;
      state.isModalShow = false;
    },
    editProductOn(state, action) {
      state.isEditing = true;
      state.editableProduct = action.payload;
      state.isModalShow = true;
    },
    editProductOff(state) {
      state.isEditing = false;
      state.areReloading = false;
      state.isModalShow = false;
    },
    showModal(state) {
      state.isModalShow = true;
    },
  },
});

export const productActions = productsSlice.actions;
export default productsSlice;
