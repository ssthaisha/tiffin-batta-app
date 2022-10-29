/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  initialLoading: true,
  user: null,
  requestingLogin: false,
  requestLoginSuccess: false,
  requestingUpdateProfile: false,
  requestUpdateProfileSuccess: false,
  loading: false,
  loginError: {},
  updateProfileError: {},
  remainingQuizCategories: [],
  screensCrumbs: [],
  newUserName: '',
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    init(state, action) {
      state.initialLoading = false;
      state.user = action.payload;
    },
    logOut(state, action) {
      state.user = null;
    },
    login(state, action) {
      // state.user = {...state.user};
      state.requestingLogin = true;
      state.requestLoginSuccess = false;
    },
    loginSuccess(state, action) {
      state.requestingLogin = false;
      state.requestLoginSuccess = true;
      state.user = action.payload;
    },
    loginError(state, action) {
      state.user = { ...state.user };
      state.requestingLogin = false;
      state.requestLoginSuccess = false;
      state.loginError = action.payload;
    },

    updateProfile(state, action) {
      state.user = { ...state.user };
      state.requestingUpdateProfile = true;
      state.requestUpdateProfileSuccess = false;
    },
    updateProfileSuccess(state, action) {
      state.requestingUpdateProfile = false;
      state.requestUpdateProfileSuccess = true;
      state.user = { ...state.user, ...action.payload };
    },
    updateProfileError(state, action) {
      state.user = { ...state.user };
      state.requestingUpdateProfile = false;
      state.requestUpdateProfileSuccess = false;
      state.updateProfileError = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      console.log("action", action);
    },
    updateProfileData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    getRemainingQuizCategories(state, action) {
      state.loading = true;
    },
    getRemainingQuizCategoriesSuccess(state, action) {
      state.remainingQuizCategories = action.payload;
      state.loading = false;
    },
    updateScreenCrumbs(state, action) {
      state.screensCrumbs = action.payload;
    },
    updateNewUserName(state, action) {
      state.newUserName = action.payload;
    }
  },
});
export const {
  init,
  logOut,
  setUser,
  login,
  loginSuccess,
  loginError,
  updateProfile,
  updateProfileSuccess,
  updateProfileError,
  updateProfileData,
  getRemainingQuizCategories,
  getRemainingQuizCategoriesSuccess,
  updateScreenCrumbs,
  updateNewUserName
} = userSlice.actions;
export default userSlice.reducer;
