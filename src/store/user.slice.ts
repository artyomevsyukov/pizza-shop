import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import type { LoginResponse } from "../interfaces/auth.interface";
import type { Profile } from "./user.interface";
import type { RegisterForm } from "../pages/Register/RegisterProps";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  profile?: Profile | null;
  loginErrorMessage?: string | undefined;
  loginLoading: boolean;
  registerErrorMessage?: string | undefined;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  profile: null,
  loginLoading: false
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: RegisterForm) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        params
        // {
        //   email: params.email,
        //   password: params.password,
        //   name: params.name
        // }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/profile",

  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { user: UserState };
      const jwt = state.user.jwt;

      if (!jwt) {
        return thunkAPI.rejectWithValue("JWT token not found");
      }

      const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      // console.log("userProfile: ", data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: state => {
      state.jwt = null;
    },
    clearLoginError: state => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: state => {
      state.registerErrorMessage = undefined;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loginLoading = true;
      state.loginErrorMessage = undefined;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
