import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice from "./cart.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
});

store.subscribe(() => {
  const currentJwt = store.getState().user.jwt;
  saveState({ jwt: currentJwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
