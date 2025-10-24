import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  jwt: string | null;
}

const initialState: UserState = { jwt: null };

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
