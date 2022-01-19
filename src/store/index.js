import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./products-slice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

export default store;
