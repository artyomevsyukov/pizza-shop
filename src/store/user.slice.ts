import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserState {
  jwt: string | null;
}

export interface UserPersistentState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    logOut: state => {
      state.jwt = null;
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
