import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    userSlice: userSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
