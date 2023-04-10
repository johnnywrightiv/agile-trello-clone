import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthMessage } from "./authMessageSlice";
import { toast } from 'react-toastify';
import AuthService from "../services/auth.service";

const userData = JSON.parse(localStorage.getItem("user"));

const user = userData ? userData.user.email : null


export const signup = createAsyncThunk(
  "auth/signup",
  async(data, thunkAPI) => {
    try{
      const response = await AuthService.signup(data.email, data.password, data.organization);
      thunkAPI.dispatch(setAuthMessage(response.data.message));
      return response.data
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setAuthMessage(message));
    return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.login(data.email, data.password);
      await thunkAPI.dispatch(setAuthMessage(response.message));
      return response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      await thunkAPI.dispatch(setAuthMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user 
  ? { isLoggedIn: true, user } 
  : { isLoggedIn: false };

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      toast.success('Signup Successful! Please Login to Your Account');
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.email;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

const { reducer } = userAuthSlice;
export default reducer;