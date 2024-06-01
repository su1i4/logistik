import { configureStore } from "@reduxjs/toolkit";

import CargoService from "@/services/cargo.service";

export const store = configureStore({
  reducer: {
    [CargoService.reducerPath]: CargoService.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CargoService.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;