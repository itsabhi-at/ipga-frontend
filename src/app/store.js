import { configureStore } from "@reduxjs/toolkit";
import { universalApi } from "./services/universalApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [userLoginApi.reducerPath]: userLoginApi.reducer,
    [universalApi.reducerPath]: universalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([universalApi.middleware]),
});

setupListeners(store.dispatch);
