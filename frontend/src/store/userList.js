import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    error: [],
    loading: false,
    success: false,
  },
  reducers: {
    userListRequested: (userList, action) => {
      userList.loading = true;
    },
    userListRequestFailed: (userList, action) => {
      userList.loading = false;
      userList.error = action.payload;
    },
    userListReceived: (userList, action) => {
      userList.users = action.payload;
      userList.loading = false;
    },
    userDeleteRequested: (userList, action) => {
      userList.success = false;
    },
    userDeleteSuccess: (userList, action) => {
      userList.success = true;
    },
    userDeleteFail: (userList, action) => {
      userList.error = action.payload;
      userList.success = false;
    },
  },
});

export const {
  userListReceived,
  userListRequested,
  userListRequestFailed,
  userDeleteRequested,
  userDeleteSuccess,
  userDeleteFail,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userListRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users", config);

    dispatch({
      type: userListReceived.type,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userListRequestFailed.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userDeleteRequested.type,
    });

    const { userInfo } = getState().entities.users;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: userDeleteSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: userDeleteFail.type,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
