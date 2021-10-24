import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "users",
  initialState: {
    userInfo: [],
    error: [],
    loading: false,
  },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },
    usersRequestFailed: (users, action) => {
      users.loading = false;
      users.error = action.payload;
    },
    // users/usersReceived
    usersReceived: (users, action) => {
      users.userInfo = action.payload;
      users.loading = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    usersLogout: (users, action) => {
      users.userInfo = {};
    },
  },
});

export const { usersReceived, usersRequested, usersRequestFailed } =
  slice.actions;
export default slice.reducer;

// Action Creators
const url = "/users/login";
// () => fn (dispatch, getState)
export const login = (email, password) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch(
    apiCallBegan({
      url,
      data: { email, password },
      config,
      method: "POST",
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};
